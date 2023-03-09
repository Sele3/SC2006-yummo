import React, { useState } from 'react'
import './_41letsyummolocation.css'
import GoogleLocation from './googlelocation.js'

export default function _41letsyummolocation () {
	const [data, setData] = useState({
		inputValue: '?',
	})

	const sendData = (data) => {
		setData(data)
	}

	return (
		<>
		<div className='h1'>
			<section>
				<yummo>
					<span className='front'>Yum</span>
					<span className='back'>mo</span>
				</yummo>
				<span className='Whereareyoulocated'>Where are you located?</span>		
			</section>
		</div>
		<GoogleLocation />			
		</>
	)
}