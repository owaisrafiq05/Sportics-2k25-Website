import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiTick } from "react-icons/ti";
import { TextField, Button } from "@mui/material";
import { Toaster, toast } from 'sonner';

const EnhancedMultiStepForm = () => {
  const steps = ["Leader Info", "Player Info", "Review", "Submit"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [formData, setFormData] = useState({
    leader: {
      name: "",
      email: "",
      cnic: "",
      phone: "",
      teamName: "",
      sports: "",
      paymentScreenshot: null,
    },
    players: [
      {
        name: "",
        cnic: "",
        phone: "",
        age: "",
      },
    ],
  });
  const [errors, setErrors] = useState({
    leader: {
      name: "",
      email: "",
      cnic: "",
      phone: "",
      teamName: "",
      sports: "",
      paymentScreenshot: "",
    },
    players: [{}],
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateCNIC = (cnic) => {
    return /^\d{13}$/.test(cnic);
  };

  const validatePhone = (phone) => {
    return /^03\d{9}$/.test(phone);
  };

  const validateAge = (age) => {
    const numAge = parseInt(age);
    return numAge >= 15 && numAge <= 60;
  };

  const handleNumberOnlyInput = (e, maxLength = null) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return false;
    }
    if (maxLength && value.length > maxLength) {
      return false;
    }
    return true;
  };

  const handleInputChange = (section, field, value, index) => {
    let error = "";
    
    if (["cnic", "phone", "age"].includes(field)) {
      if (!handleNumberOnlyInput({ target: { value } }, field === "cnic" ? 13 : field === "phone" ? 11 : 2)) {
        return;
      }
    }

    if (field === "email" && value) {
      if (!validateEmail(value)) {
        toast.error("Please enter a valid email address");
        error = "Invalid email format";
      }
    } else if (field === "cnic" && value) {
      if (!validateCNIC(value)) {
        toast.error("CNIC must be exactly 13 digits");
        error = "CNIC must be 13 digits";
      }
    } else if (field === "phone" && value) {
      if (!validatePhone(value)) {
        toast.error("Phone number must start with 03 and be 11 digits");
        error = "Invalid phone format";
      }
    } else if (field === "age" && value) {
      if (!validateAge(value)) {
        toast.error("Age must be between 15 and 60");
        error = "Invalid age";
      }
    }

    if (section === "leader") {
      setErrors(prev => ({
        ...prev,
        leader: {
          ...prev.leader,
          [field]: error
        }
      }));
    } else if (section === "players") {
      setErrors(prev => {
        const newPlayerErrors = [...prev.players];
        newPlayerErrors[index] = {
          ...newPlayerErrors[index],
          [field]: error
        };
        return {
          ...prev,
          players: newPlayerErrors
        };
      });
    }

    if (section === "leader") {
      setFormData((prevState) => ({
        ...prevState,
        leader: {
          ...prevState.leader,
          [field]: value,
        },
      }));
    } else if (section === "players") {
      setFormData((prevState) => {
        const newPlayers = [...prevState.players];
        newPlayers[index] = {
          ...newPlayers[index],
          [field]: value,
        };
        return {
          ...prevState,
          players: newPlayers,
        };
      });
    }

    if (error) {
      toast.error(error);
    }
  };

  const addPlayer = () => {
    setFormData((prev) => ({
      ...prev,
      players: [...prev.players, { name: "", cnic: "", phone: "", age: "" }],
    }));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("Form Data:", formData);
      toast.success("Form submitted successfully!");
      setComplete(true);
      setCurrentStep(steps.length);
    } else {
      toast.error("Please complete all required fields before submitting.");
    }
  };

  const validateStep = (step) => {
    if (step === 1) {
      const leaderFields = ["name", "email", "cnic", "phone", "teamName", "sports"];
      const hasErrors = Object.values(errors.leader).some(error => error !== "");
      const hasEmptyFields = leaderFields.some(field => !formData.leader[field]);
      return !hasErrors && !hasEmptyFields;
    } else if (step === 2) {
      return formData.players.every((player, index) => {
        const hasErrors = Object.values(errors.players[index] || {}).some(error => error !== "");
        return !hasErrors && player.name && player.cnic && player.phone && player.age;
      });
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      toast.success(`Step ${currentStep} completed!`);
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  const Stepper = () => {
    return (
      <div className="w-full relative mb-8 px-4">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-5 left-[50px] right-[50px] h-[2px] bg-gray-200">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center relative"
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center 
                    text-sm font-medium relative z-10 transition-all duration-300
                    bg-white
                    ${
                      index + 1 < currentStep || (index + 1 === steps.length && complete)
                        ? "bg-green-500 border-2 border-green-500"
                        : index + 1 === currentStep
                        ? "border-2 border-blue-600"
                        : "border-2 border-gray-200"
                    }
                  `}
                >
                  {index + 1 < currentStep || (index + 1 === steps.length && complete) ? (
                    <TiTick className="w-6 h-6 text-white bg-green-600 rounded-full" />
                  ) : (
                    <span
                      className={
                        index + 1 === currentStep
                          ? "text-blue-600"
                          : "text-gray-400"
                      }
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                <span
                  className={`
                    mt-2 text-xs sm:text-sm font-medium text-center
                    ${
                      index + 1 <= currentStep || (index + 1 === steps.length && complete)
                        ? "text-blue-600"
                        : "text-gray-400"
                    }
                  `}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Toaster 
        richColors 
        position="top-center"
        expand={false}
        closeButton
        toastOptions={{
          duration: 3000,
          className: 'toast-notification',
        }}
      />
      <div className="min-h-screen flex items-center justify-center px-4 py-8 mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col p-4 sm:p-8">
            <Stepper />
            <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="leader-info"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full px-4 sm:px-6"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                      Leader Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <TextField
                        label="Leader Name"
                        variant="outlined"
                        value={formData.leader.name}
                        onChange={(e) => handleInputChange("leader", "name", e.target.value)}
                        fullWidth
                        size="small"
                        className="!text-sm sm:!text-base"
                      />
                      <TextField
                        label="Leader Email"
                        variant="outlined"
                        type="email"
                        value={formData.leader.email}
                        onChange={(e) => handleInputChange("leader", "email", e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <TextField
                        label="Leader CNIC"
                        variant="outlined"
                        value={formData.leader.cnic}
                        onChange={(e) => handleInputChange("leader", "cnic", e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <TextField
                        label="Leader Phone Number"
                        variant="outlined"
                        value={formData.leader.phone}
                        onChange={(e) => handleInputChange("leader", "phone", e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <TextField
                        label="Team Name"
                        variant="outlined"
                        value={formData.leader.teamName}
                        onChange={(e) => handleInputChange("leader", "teamName", e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <TextField
                        label="Sports"
                        variant="outlined"
                        value={formData.leader.sports}
                        onChange={(e) => handleInputChange("leader", "sports", e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <div className="col-span-1 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Screenshot
                        </label>
                        <input
                          type="file"
                          className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onChange={(e) =>
                            handleInputChange("leader", "paymentScreenshot", e.target.files[0])
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div
                    key="player-info"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full px-4 sm:px-6"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                      Player Information
                    </h2>
                    <AnimatePresence>
                      {formData.players.map((player, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.5 }}
                          className="mb-6 p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md"
                        >
                          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                            Player {index + 1}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <TextField
                              label="Player Name"
                              variant="outlined"
                              value={player.name}
                              onChange={(e) =>
                                handleInputChange("players", "name", e.target.value, index)
                              }
                              fullWidth
                              size="small"
                            />
                            <TextField
                              label="Player CNIC"
                              variant="outlined"
                              value={player.cnic}
                              onChange={(e) =>
                                handleInputChange("players", "cnic", e.target.value, index)
                              }
                              fullWidth
                              size="small"
                            />
                            <TextField
                              label="Player Phone Number"
                              variant="outlined"
                              value={player.phone}
                              onChange={(e) =>
                                handleInputChange("players", "phone", e.target.value, index)
                              }
                              fullWidth
                              size="small"
                            />
                            <TextField
                              label="Player Age"
                              variant="outlined"
                              value={player.age}
                              onChange={(e) =>
                                handleInputChange("players", "age", e.target.value, index)
                              }
                              fullWidth
                              size="small"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full text-sm sm:text-base font-semibold transition-colors duration-300 hover:bg-blue-600"
                      onClick={addPlayer}
                    >
                      + Add Another Player
                    </motion.button>
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full px-4 sm:px-6"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                      Review Information
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
                        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
                          Leader Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {Object.entries(formData.leader).map(([key, value]) => (
                            <p key={key} className="text-sm sm:text-base">
                              <span className="font-semibold capitalize">{key}: </span>
                              {key === "paymentScreenshot"
                                ? value
                                  ? "Uploaded"
                                  : "Not uploaded"
                                : value}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                          Player Information
                        </h3>
                        {formData.players.map((player, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md"
                          >
                            <h4 className="text-base sm:text-lg font-semibold mb-3">
                              Player {index + 1}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {Object.entries(player).map(([key, value]) => (
                                <p key={key} className="text-sm sm:text-base">
                                  <span className="font-semibold capitalize">{key}: </span>
                                  {value}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentStep === 4 && !complete ? (
                  <motion.div
                    key="submit"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full px-4 sm:px-6"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                      Submit
                    </h2>
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
                      <p className="text-base sm:text-lg mb-4">
                        Please review all the information you've entered. Once you're sure
                        everything is correct, click the "Submit" button below to complete the
                        registration process.
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        By submitting this form, you confirm that all the information provided
                        is accurate and complete.
                      </p>
                    </div>
                  </motion.div>
                ) : currentStep === 4 && complete ? (
                  <motion.div
                    key="submission-complete"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full px-4 sm:px-6 text-center"
                  >
                    <div className="bg-green-50 p-6 rounded-lg shadow-md">
                      <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4">
                        <TiTick className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-green-700 mb-4">
                        Registration Complete!
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Thank you for your registration. We have received your information and will contact you shortly.
                      </p>
                      <p className="text-sm text-gray-500">
                        A confirmation email will be sent to your registered email address.
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            {!complete && (
              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gray-300 rounded-full text-gray-800 font-semibold transition-colors duration-300 hover:bg-gray-400"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                  >
                    Previous
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale:  1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full text-white font-semibold transition-colors duration-300 ${
                    currentStep === steps.length
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => {
                    if (currentStep === steps.length) {
                      handleSubmit();
                    } else {
                      handleNextStep();
                    }
                  }}
                >
                  {currentStep === steps.length ? "Submit" : "Next"}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default EnhancedMultiStepForm; 