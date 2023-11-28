import React from 'react'
import './nav.css'

function FeatureTabs({Title}) {
  return (<>
  <div className="tabs-bg">
     <div className="tabs">
        <p>{Title}</p>
    </div>
    </div>
    </>
  )
}

export default FeatureTabs