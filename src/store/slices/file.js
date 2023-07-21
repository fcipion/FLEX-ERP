import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  upload: [],
  showPopUp: false,
};

const slice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addMultipleUploadFile(state, action) {
      state.upload = [
        ...state.upload,
        ...Array.from(action.payload.files).map((file) => ({
          id: crypto.randomUUID(),
          reference: action.payload.reference,
          orderId: action.payload.orderId,
          file,
          status: "pending",
          percentage: 0,
          uploadedChunkSize: 0,
        })),
      ];
    },

    updateFile(state, action) {
      state.upload = state.upload.map((data) => {
        if (data.id == action.payload.id) {
          data = {
            ...data,
            ...action.payload,
          };
        }
        return data;
      });
    },

    removeUploadFile(state, action) {
      state.upload = state.upload.filter(
        (u) => !Array.from(action.payload || []).includes(u.id)
      );
    },

    changeStatusModalUpload(state, action) {
      state.showPopUp = action.payload;
    },
  },
});

export const {
  addMultipleUploadFile,
  removeUploadFile,
  changeStatusModalUpload,
  updateFile,
} = slice.actions;

export default slice.reducer;
