import React from "react";

export default function Services() {

const services = [
  {
    icon: "🚚",
    title: "Free Shipping",
    desc: "Order above $200",
  },
  {
    icon: "💳",
    title: "Money-back",
    desc: "30 days guarantee",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    desc: "Secured by Stripe",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    desc: "Phone and Email support",
  },
];

return (

<div className="bg-gray-100 py-10">

<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">

{services.map((service,index)=>(
<div
key={index}
className="bg-white p-6 rounded-lg flex items-start gap-4 hover:shadow-md transition cursor-pointer"
>

<span className="text-3xl">
{service.icon}
</span>

<div>
<h3 className="font-semibold text-lg">
{service.title}
</h3>

<p className="text-gray-500 text-sm">
{service.desc}
</p>
</div>

</div>
))}

</div>

</div>

);
}