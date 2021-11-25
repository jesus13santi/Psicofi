import React from 'react'
import swal from '@sweetalert/with-react';

export default function Sweetalert({ title, date, description }) {
    swal(
        <div>
            <h3>{title}</h3>
            <p>{date}</p>
            <p>{description}</p>
        </div>
      )
}
