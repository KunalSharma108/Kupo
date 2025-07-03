import React from 'react'

interface RenderSectionProps {
  type: string,
  data: any,
}

function RenderSection({type, data}: RenderSectionProps): React.JSX.Element {
  return (
    <div>
      name : {type}

      data is {data}
    </div>
  )
}

export default RenderSection
