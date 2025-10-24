import React, { useEffect, useState } from 'react'
import MenuCategory from './MenuCategory'


export default function MenuList(){
const [data, setData] = useState(null)


useEffect(()=>{
fetch('/src/data/menu.json').then(r=>r.json()).then(setData)
},[])


if(!data) return <div className="py-24 text-center">Loading menu...</div>


return (
<section id="menu" className="py-20 bg-white">
<div className="max-w-6xl mx-auto px-6">
<h2 className="text-3xl font-bold text-center mb-6">Our Menu</h2>
<p className="text-center text-gray-500 mb-10">Browse categories — click a category to view items and sizes.</p>


<div className="space-y-12">
{data.categories.map(cat => (
<MenuCategory key={cat.id} category={cat} />
))}
</div>
</div>
</section>
)
}