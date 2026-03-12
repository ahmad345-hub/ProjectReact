import React, { useState, useRef } from "react";

import sof from "../../assets/sof.png";
import lamp1 from "../../assets/lamp1.png";
import lamp2 from "../../assets/lamp2.png";
import basket from "../../assets/basket.png";
import twister from "../../assets/twister.png";

export default function NewArrival() {

const products = [
  { id:1, name:"Loveseat Sofa", price:199, oldPrice:400, image: sof },
  { id:2, name:"Table Lamp", price:24.99, image: lamp1 },
  { id:3, name:"Beige Table Lamp", price:24.99, image: lamp2 },
  { id:4, name:"Bamboo Basket", price:24.99, image: basket },
  { id:5, name:"Twister", price:224.99, image: twister }
];

const sliderRef = useRef(null);
const [isDown,setIsDown] = useState(false);
const [startX,setStartX] = useState(0);
const [scrollLeft,setScrollLeft] = useState(0);

const handleMouseDown = (e)=>{
  setIsDown(true)
  setStartX(e.pageX - sliderRef.current.offsetLeft)
  setScrollLeft(sliderRef.current.scrollLeft)
}

const handleMouseLeave = ()=>{
  setIsDown(false)
}

const handleMouseUp = ()=>{
  setIsDown(false)

  const slider = sliderRef.current

  if(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth){
      slider.scrollTo({left:0,behavior:"smooth"})
  }
}

const handleMouseMove = (e)=>{
  if(!isDown) return
  e.preventDefault()

  const x = e.pageX - sliderRef.current.offsetLeft
  const walk = (x - startX) * 2
  sliderRef.current.scrollLeft = scrollLeft - walk
}

return (

<div className="max-w-7xl mx-auto py-12">

<h2 className="text-3xl font-bold mb-8">New Arrivals</h2>

<div
ref={sliderRef}
className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing scroll-smooth"
onMouseDown={handleMouseDown}
onMouseLeave={handleMouseLeave}
onMouseUp={handleMouseUp}
onMouseMove={handleMouseMove}
>

{products.map((product)=>(
<div
key={product.id}
className="min-w-[220px] sm:min-w-[250px] md:min-w-[260px] bg-white p-4 rounded-lg shadow hover:shadow-xl transition cursor-pointer"
>

<div className="relative bg-gray-100 p-4 rounded-md">

<span className="absolute top-2 left-2 text-xs bg-gray-200 px-2 py-1 rounded">
NEW
</span>

<span className="absolute top-2 right-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
-50%
</span>

<img
src={product.image}
alt={product.name}
className="h-32 mx-auto object-contain hover:scale-110 transition"
/>

</div>

<h3 className="mt-3 text-sm font-medium">
{product.name}
</h3>

<div className="text-yellow-400 text-sm">
★★★★★
</div>

<div className="flex items-center gap-2">
<span className="font-bold">${product.price}</span>

{product.oldPrice && (
<span className="line-through text-gray-400 text-sm">
${product.oldPrice}
</span>
)}

</div>

</div>
))}

</div>

</div>

);
}