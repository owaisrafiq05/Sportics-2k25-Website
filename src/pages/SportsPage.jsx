import React from 'react';
import './SportsPage.css'; // Assuming you will create a CSS file for styling

const sportsData = [
  { name: 'Futsal Boys', fee: 6000, category: 'Sports' },
  { name: 'Futsal Girls', fee: 6000, category: 'Sports' },
  { name: 'Basketball Boys', fee: 7000, category: 'Sports' },
  { name: 'Basketball Girls', fee: 6000, category: 'Sports' },
  { name: 'Throwball', fee: 5000, category: 'Sports' },
  { name: 'Volleyball', fee: 6000, category: 'Sports' },
  { name: 'Indoor Cricket', fee: 4000, category: 'Sports' },
  { name: 'Badminton Singles Boys', fee: 1200, category: 'Sports' },
  { name: 'Badminton Singles Girls', fee: 1200, category: 'Sports' },
  { name: 'Badminton Doubles Boys', fee: 2000, category: 'Sports' },
  { name: 'Badminton Doubles Girls', fee: 2000, category: 'Sports' },
  { name: 'Table Tennis Singles Boys', fee: 1000, category: 'Sports' },
  { name: 'Table Tennis Singles Girls', fee: 1000, category: 'Sports' },
  { name: 'Table Tennis Doubles Boys', fee: 1200, category: 'Sports' },
  { name: 'Table Tennis Doubles Girls', fee: 1200, category: 'Sports' },
  { name: 'Table Tennis Mixed', fee: 1500, category: 'Sports' },
  // { name: 'Padel Singles', fee: 2500, category: 'Sports' },
  { name: 'Chess', fee: 700, category: 'Board Games' },
  { name: 'Scrabble', fee: 700, category: 'Board Games' },
  { name: 'Sequence', fee: 1200, category: 'Board Games' },
  { name: 'Counter Strike 2', fee: 2000, category: 'Esports' },
  { name: 'Valorant', fee: 2000, category: 'Esports' },
  { name: 'FC 25', fee: 800, category: 'Esports' },
  { name: 'Tekken 7', fee: 800, category: 'Esports' },
  { name: 'PUBG', fee: 1000, category: 'Esports' }
];

function SportsPage() {
  const categories = [...new Set(sportsData.map(sport => sport.category))];

  return (
    <div className="sports-page">

      {categories.map(category => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="sports-list">
            {sportsData.filter(sport => sport.category === category).map((sport, index) => (
              <div key={index} className="sport-item">
                <span className="sport-name">{sport.name}</span>
                <div className="sport-fee">
                  {sport.discountedFee ? (
                    <>
                      <span className="original-fee" style={{ textDecoration: 'line-through', color: 'red' }}>
                        Fee: {sport.fee} PKR
                      </span>
                      <div className="discounted-fee">New Fee: {sport.discountedFee} PKR</div>
                    </>
                  ) : (
                    <div>Fee: {sport.fee} PKR</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SportsPage;
