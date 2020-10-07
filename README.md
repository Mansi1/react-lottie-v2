# REACT-LOTTIE-V2

this project uses lottie airbnb technology to render the specific JSON  
```
 import React from 'react'
 import {IPropsLottieBase, Lottie, unwrapJsonModule} from "react-lottie-v2";

 // add here your json file 
 import * as ICON_DATA from './MyFancyIcon.json'
 
 export const MyFancyIcon = (props: IPropsLottieBase) => {
     return (
         <Lottie  {...props} animationData={unwrapJsonModule(ICON_DATA)}/>
     )
 }
```
