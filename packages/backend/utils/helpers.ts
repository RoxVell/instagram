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

  static likeEntityMixin(entityRepository, likeRepository, fieldNames: { entityField: string; ownerField: string }) {
    return {
      like: this.likeEntity(entityRepository, likeRepository, fieldNames),
      unlike: this.unlikeEntity(entityRepository, likeRepository, fieldNames),
    };
  }

  static likeEntity(entityRepository, likeRepository, fieldNames: { entityField: string; ownerField: string }) {
    return async (payload: { entityId: string, ownerId: string; }) => {
      const schema = {
        [fieldNames.entityField]: payload.entityId,
        [fieldNames.ownerField]: payload.ownerId
      };

      const isLikeExists = await likeRepository.exists(schema);

      if (isLikeExists) {
        throw new Error('Already liked');
      }

      await likeRepository.create([schema]);

      await entityRepository.findByIdAndUpdate(payload.entityId, {
        $inc: {
          likes: 1
        }
      }, {
        useFindAndModify: false,
      });

      return {
        error: false,
        message: 'success'
      };
    }
  }

  static unlikeEntity(entityRepository, likeRepository, fieldNames: { entityField: string; ownerField: string }) {
    return async (payload: { entityId: string, ownerId: string }) => {
      const schema = {
        [fieldNames.entityField]: payload.entityId,
        [fieldNames.ownerField]: payload.ownerId
      };

      const commentLike = await likeRepository.findOne(schema);

      if (!commentLike) {
        throw new Error('Entity is not liked');
      }

      await commentLike.remove();

      await entityRepository.findByIdAndUpdate(payload.entityId, {
        $inc: {
          likes: -1
        }
      }, {
        useFindAndModify: false,
      });

      return {
        error: false,
        message: 'success'
      };
    };
  }
}
