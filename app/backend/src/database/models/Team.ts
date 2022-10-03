import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Team extends Model {
  public id!: number;
  public teamName!: string;
}

Team.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
      allowNull: false,
    },
    teamName: {
      type: STRING,
      allowNull: false,
      field: 'team_name',
    },
  },
  {
    timestamps: false,
    underscored: true,
    sequelize: db,
    modelName: 'teams',
  },
);

export default Team;
