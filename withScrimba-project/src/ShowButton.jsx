// I have a bunch of cards and when ordering them I want to show 
// only 4 of them or fewer, If I have more than four cards I want to 
// have a button to show more, and if clicked, I get to see all the 
// cards and I need a button to show less to shrink to 4 or less 
// again, But if my cards are four or less I do not need any button at All.


import { useState } from "react"



// Sample data for cards
const cardsData = [
  { id: 1, title: 'Card 1', description: 'This is the description for Card 1.' },
  { id: 2, title: 'Card 2', description: 'This is the description for Card 2.' },
  { id: 3, title: 'Card 3', description: 'This is the description for Card 3.' },
  { id: 4, title: 'Card 4', description: 'This is the description for Card 4.' },
  { id: 5, title: 'Card 5', description: 'This is the description for Card 5.' },
  { id: 6, title: 'Card 6', description: 'This is the description for Card 6.' },
  { id: 7, title: 'Card 7', description: 'This is the description for Card 7.' },
  { id: 8, title: 'Card 8', description: 'This is the description for Card 8.' },
]


export default function Toggle(){

    const[show, setShow]= useState(false)

   const showLess= show? cardsData :cardsData.slice(0,4)
   const showMore= cardsData.length > 4


    return (
        <>
        <h1 className="font-bold">Show more or show less</h1>
<div>
      <div>
        {showLess.map(card => (
          <div
            key={card.id}
            style={{
              backgroundColor: 'green',
              margin: '10px',
              padding: '10px',
              color: 'white',
              borderRadius: '10px',
            }}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
      <div className=" flex gap-3">
        { !show ? 
                (<button onClick={()=>setShow(true)} className="border border-amber-50 bg-blue-200">Show More</button>)
:         (<button onClick={()=>setShow(false)} className=" bg-blue-200">Show Less</button>)

    }
      </div>
    </div>
        </>
    )
}