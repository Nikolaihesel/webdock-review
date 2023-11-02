import React from 'react'
import '../stylesheet/nav.css'

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