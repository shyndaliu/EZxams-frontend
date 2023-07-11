import React from "react";

function fmt(date, format = 'YYYY-MM-DDThh:mm:ss') {
    const pad2 = (n) => n.toString().padStart(2, '0');

    const map = {
        YYYY: date.getFullYear(),
        MM: pad2(date.getMonth() + 1),
        DD: pad2(date.getDate()),
        hh: pad2(date.getHours()),
        mm: pad2(date.getMinutes()),
        ss: pad2(date.getSeconds()),
    };

    return Object.entries(map).reduce((prev, entry) => prev.replace(...entry), format);
}
Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
}

export default function DatePicker() {
    return <>
        <input className="bg-gray-200 border-none rounded-2xl" type="datetime-local" id="meeting-time"
            name="meeting-time"
            min={`${fmt(new Date().addHours(2), 'YYYY-MM-DDThh:mm')}`} />

    </>

}