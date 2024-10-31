import mongoose from "mongoose";

interface ICounter extends mongoose.Document {
    sequenceValue: number;    
}

const CounterSchema = new mongoose.Schema({
    sequenceValue: { type: Number, default: 0 }
});

export const Counter = mongoose.model<ICounter>("Counter", CounterSchema);