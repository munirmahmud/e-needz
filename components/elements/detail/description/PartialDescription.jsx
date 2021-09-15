import { useEffect, useState } from 'react'

const PartialDescription = ({ product_id, category_id }) => {
  const [prodDescription, setProdDescription] = useState(undefined)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product_description`, {
      method: 'POST',
      body: JSON.stringify({
        product_id: product_id,
        category_id: category_id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          setProdDescription(result.data[0].description)
        }
      })
      .catch((error) => console.log('error', error))
  }, [product_id, category_id])

  return (
    <div className='ps-document'>
      <h4>Product Description</h4>
      <div
        className='content'
        dangerouslySetInnerHTML={{ __html: prodDescription }}
      ></div>
    </div>
  )
}

export default PartialDescription
