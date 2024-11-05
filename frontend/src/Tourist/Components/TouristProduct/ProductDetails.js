const ProductDetails = ({ product }) => {

    return (
        <div className="product-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
        </div>
    )

}

export default ProductDetails