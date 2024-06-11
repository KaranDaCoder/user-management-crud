import mongoose, { Schema } from 'mongoose';

const MovieSchema = new Schema(
  {
    movie_name: {
      type: String,
      required: true,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);
export default Movie;
