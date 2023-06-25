import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  upload: [],
  uploading: [],
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
        })),
      ];
    },

    removeUploadFile(state, action) {
      state.upload = state.upload.filter(
        (u) => !Array.from(action.payload || []).includes(u.id)
      );
    },

    addMultipleUploading(state, action) {
      state.uploading = [
        ...state.uploading,
        ...Array.from(action.payload.files).map((file) => ({
          id: crypto.randomUUID(),
          reference: action.payload.reference,
          orderId: action.payload.orderId,
          uploaded: false,
          file,
        })),
      ];
    },

    removeUploading(state, action) {
      state.uploading = state.uploading.filter((u) =>
        Array.from(action.payload || []).includes(u.id)
      );
    },

    updateUploading(state, action) {
      state.uploading = state.uploading.map((u) => {
        if (u.id !== action.payload.id) return u;

        return {
          ...u,
          ...action.payload,
        };
      });
    },

    changeStatusModalUpload(state, action) {
      state.showPopUp = action.payload;
    },
  },
});

export const {
  addMultipleUploadFile,
  addMultipleUploading,
  removeUploadFile,
  removeUploading,
  updateUploading,
  changeStatusModalUpload,
} = slice.actions;

export default slice.reducer;
