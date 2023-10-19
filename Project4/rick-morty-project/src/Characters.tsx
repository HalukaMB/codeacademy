import React from 'react'

type CharacterProps = {
    someInfo: {
        name:string;
        age:number
    },
    favNumber:number
}

function Characters({someInfo, favNumber}: CharacterProps) {

    console.log('someInfo', someInfo)
  return (
    <div>Characters</div>
  )
}

export default Characters

// import React from 'react'

// function Characters({someInfo}) {


//     console.log('someInfo', someInfo.name)
//   return (
//     <div>Characters</div>
//   )
// }

// export default Characters