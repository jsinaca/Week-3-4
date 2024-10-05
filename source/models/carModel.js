module.exports = (mongoose) => {
    const Car = mongoose.model(
        'car',
        mongoose.Schema(
            {
            Make: String,
            Model: String,
            Year: Number,
            Color: String,
            Transmission: String,
            Engine: Number,
            Miles: Number,
            FuelType: String
        },
        {timestaps: true}
    ))
    return Car;
}
