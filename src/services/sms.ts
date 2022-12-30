import Kavenegar from "kavenegar";

var kavenegar = Kavenegar.KavenegarApi({
  apikey: process.env.KAVENEGAR_APIKEY || "",
});

export const sendVerificationCodeViaSMS = (
  receptor: string,
  verificationCode: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    kavenegar.VerifyLookup(
      {
        receptor,
        template: process.env.KAVENEGAR_VERIFICATION_TEMPLATE_NAME,
        token: verificationCode,
      },
      (entries, status, message) => {
        if (status === 200) {
          resolve(true);
        } else {
          console.warn(entries, message);
          resolve(false);
        }
      }
    );
  });
};
