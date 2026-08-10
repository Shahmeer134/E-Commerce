import {
  ClientSession,
  Document,
  Model,
  ProjectionType,
  QueryOptions,
  QueryWithHelpers,
  RootFilterQuery,
  Schema,
  UpdateQuery,
  UpdateResult,
  model,
} from "mongoose";

export default class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(name: string, schema: Schema) {
    this.model = model<T>(name, schema);
  }

  create(
    obj: Record<string, any>,
    options?: { session?: ClientSession },
  ): Promise<T> {
    return this.model.create([obj], options).then((docs) => docs[0]);
  }

  get(
    filter: RootFilterQuery<T> = {} as RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): QueryWithHelpers<T | null, T> {
    return this.model.findOne(filter, projection, options);
  }

  findAll(
    filter: RootFilterQuery<T> = {} as RootFilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T>,
  ): QueryWithHelpers<T[], T> {
    return this.model.find(filter, projection, options);
  }

  countDocuments(
    filter: RootFilterQuery<T> = {} as RootFilterQuery<T>,
  ): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  upsert(
    filter: RootFilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.findOneAndUpdate(filter, update, {
      ...options,
      upsert: true,
      new: true,
      lean: true,
    });
  }

  update(
    filter: RootFilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): QueryWithHelpers<T | null, T> {
    return this.model.findOneAndUpdate(
      filter,
      update,
      options || { new: true },
    );
  }

  updateMany(
    filter: RootFilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<UpdateResult> {
    return this.model.updateMany(
      filter,
      update,
      options,
    ) as Promise<UpdateResult>;
  }

  delete(filter: RootFilterQuery<T>): QueryWithHelpers<T | null, T> {
    return this.model.findOneAndDelete(filter);
  }

  deleteMany(filter: RootFilterQuery<T>) {
    return this.model.deleteMany(filter).exec();
  }
}
