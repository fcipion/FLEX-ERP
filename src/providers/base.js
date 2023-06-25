import axios from "axios";

class Base {
  constructor(config) {
    this.axios = axios.create(config);
  }

  async get(endpoint, config = {}) {
    return new Promise((resolve) => {
      this.axios
        .get(endpoint, config)
        .then((res) => resolve(res.data))
        .catch((error) => {
          const response = error.response;
          const message =
            response && response.data && response.data.error
              ? response.data.error.message
              : error.message;
          return resolve({ error: { message } });
        });
    });
  }

  async post(endpoint, data = {}, config = {}) {
    return new Promise((resolve) => {
      this.axios
        .post(endpoint, data, config)
        .then((res) => resolve(res.data))
        .catch((error) => {
          const response = error.response;
          const message =
            response && response.data && response.data.error
              ? response.data.error.message
              : error.message;

          return resolve({ error: { message } });
        });
    });
  }

  async update(endpoint, data = {}, config = {}) {
    return new Promise((resolve) => {
      this.axios
        .patch(endpoint, data, config)
        .then((res) => resolve(res.data))
        .catch((error) => {
          const response = error.response;
          const message =
            response && response.data && response.data.error
              ? response.data.error.message
              : error.message;

          return resolve({ error: { message } });
        });
    });
  }

  async delete(endpoint, config = {}) {
    return new Promise((resolve) => {
      this.axios
        .delete(endpoint, config)
        .then((res) => resolve(res.data))
        .catch((error) => {
          const response = error.response;
          const message =
            response && response.data && response.data.error
              ? response.data.error.message
              : error.message;

          return resolve({ error: { message } });
        });
    });
  }

  async uploadFile(
    endpoint,
    file,
    callback = {
      setProgress: () => {},
      setUploadSpeed: () => {},
      setRemainingTime: () => {},
      cancelUpload: () => {},
      setIsUploading: () => {},
      setIsConnected: () => {},
    }
  ) {
    let cancelToken;
    let startTime;
    let elapsedTime = 0;
    let totalUploaded = 0;
    let prevUploaded = 0;

    return new Promise(async (resolve) => {
      if (typeof callback.setProgress == "function") {
        callback.setProgress(0);
      }

      try {
        await this.axios.post(endpoint, file, {
          cancelToken: new axios.CancelToken(function executor(c) {
            cancelToken = c;
          }),
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            totalUploaded = loaded;

            if (typeof callback.setProgress == "function") {
              callback.setProgress(Math.round((loaded / total) * 100));
            }

            if (!startTime) {
              startTime = Date.now();
            } else {
              elapsedTime = (Date.now() - startTime) / 1000;
              const uploadedBytes = totalUploaded - prevUploaded;
              const uploadSpeedBytesPerSec = uploadedBytes / elapsedTime;

              if (typeof callback.setUploadSpeed == "function") {
                callback.setUploadSpeed(uploadSpeedBytesPerSec);
              }

              prevUploaded = totalUploaded;

              const remainingBytes = total - totalUploaded;
              const remainingTimeSeconds =
                remainingBytes / uploadSpeedBytesPerSec;

              if (typeof callback.setRemainingTime == "function") {
                callback.setRemainingTime(remainingTimeSeconds);
              }
            }
          },
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          return resolve({ error: { message: "Cancell uploading" } });
        } else {
          if (typeof callback.setIsConnected == "function") {
            callback.setIsConnected(false);
          }
          typeof cancelToken == "function" && cancelToken();
        }
      } finally {
        if (typeof callback.setIsUploading == "function") {
          callback.setIsUploading(false);
        }

        if (typeof callback.setProgress == "function") {
          callback.setProgress(false);
        }

        if (typeof callback.setRemainingTime == "function") {
          callback.setRemainingTime(false);
        }

        if (typeof callback.setUploadSpeed == "function") {
          callback.setUploadSpeed(false);
        }

        startTime = null;
        elapsedTime = 0;
        totalUploaded = 0;
        prevUploaded = 0;
      }

      if (
        typeof callback.cancelUpload == "function" &&
        typeof cancelToken == "function"
      ) {
        callback.cancelUpload(() => {
          cancelToken();
        });
      }
    });
  }
}

export default Base;
