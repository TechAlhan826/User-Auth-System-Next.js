import mongoose from "mongoose";

let isConnected = false; // track the connection

export async function connect() {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const URI = `mongodb+srv://collab-docs-editor-2:CollaB_DocS_EditoR_2@collaborative-docs-edit.ppyb78f.mongodb.net/?retryWrites=true&w=majority&appName=Collaborative-Docs-Editor`;
    
    await mongoose.connect(URI);

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
      isConnected = true;
    });

    connection.on('error', (err) => {
      console.log('MongoDB connection error: ' + err);
      isConnected = false;
    });

  } catch (error) {
    console.log('Something went wrong!');
    console.error(error);
    isConnected = false;
  }
}