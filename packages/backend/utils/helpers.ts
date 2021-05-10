import UnavailableFormatException from "../exceptions/unavailable-format.exception";

export default class Utils {
  static createFileFilter = (formats: string[]) => {
    return (req, file, callback) => {
      const filterRegexp = new RegExp(`\.${formats.join('|')}$`);

      if (!file.originalname.match(filterRegexp)) {
        return callback(new UnavailableFormatException(formats), false);
      }

      callback(null, true);
    };
  };
}
