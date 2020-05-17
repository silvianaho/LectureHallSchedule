import { expect, server } from './setup';

describe('Lectures', () => {
  it('get lectures data viewer page', (done) => {
    server
      .get('/basic')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.lectures).to.be.instanceOf(Array);
        res.body.lectures.forEach((m) => {
          expect(m).to.have.property('lectureid');
          expect(m).to.have.property('facultyid');
          expect(m).to.have.property('semesterid');
          expect(m).to.have.property('dayofweek');
          expect(m).to.have.property('starttime');
          expect(m).to.have.property('endtime');
        });
        done();
      });
  });
  it('add new lectures', (done) => {
    const data = {
      data: [
        {
          lectureId: 1111222233,
          semesterId: 1111222233,
          facultyId: 1111222233,
          dayOfWeek: 3,
          startTime: '1200',
          endTime: '1400',
        },
        {
          lectureId: '8888888844',
          semesterId: '8888888844',
          facultyId: '8888888844',
          dayOfWeek: 2,
          startTime: '1200',
          endTime: '1400',
        },
      ],
    };
    server
      .post('/basic/insert')
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.messages).to.be.instanceOf(Array);

        const members = [];
        res.body.messages.forEach(lecture => {
          members.push(lecture.lectureid);
        });

        expect(members).to.have.members([
          '1111222233',
          '8888888844',
        ]);
        done();
      });
  });
});
