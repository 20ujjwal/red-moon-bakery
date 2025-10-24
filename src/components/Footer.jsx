import React from 'react'


export default function Footer(){
return (
<footer className="py-8 bg-white border-t">
<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-4">
<img src="/images/logo.png" alt="logo" className="w-12 h-12 rounded-full" />
<div>
<p className="font-semibold">Red Moon Bakery & Cafe</p>
<p className="text-sm text-gray-500">Handcrafted goodness in Brampton</p>
</div>
</div>
<div className="text-sm text-gray-500">© {new Date().getFullYear()} Red Moon Bakery & Cafe. All rights reserved.</div>
</div>
</footer>
)
}