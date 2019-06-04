import update from 'immutability-helper';
import { entriesToObj } from '../general-utils';

const groupsWithStudentDetails = db =>
  update(db.Groups, {
    $set: entriesToObj(
      Object.keys(db.Groups).map(groupUID => [
        groupUID,
        update(db.Groups[groupUID], {
          participants: {
            $set: entriesToObj(
              Object.keys(db.Groups[groupUID].participants).map(studentUID => [
                studentUID,
                update(db.Groups[groupUID].participants[studentUID], {
                  $set: db.Students[studentUID]
                })
              ])
            )
          }
        })
      ])
    )
  });

export { groupsWithStudentDetails };
