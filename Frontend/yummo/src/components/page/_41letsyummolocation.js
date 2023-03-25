import React from 'react'
import './_41letsyummolocation.css'
import GoogleLocation from './googlelocation.js'

export default function _41letsyummolocation () {
	return (
		<>
		<div className='texts'>
			<section>
				<span className='front'>Yum</span>
				<span className='back'>mo</span>
				<span className='WAYL'>Where are you located?</span>		
			</section>
		</div>
		<div className="location-container">
		<GoogleLocation />					
		</div>
		</>
	)
}