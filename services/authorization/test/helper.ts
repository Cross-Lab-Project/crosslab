import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
// Configure chai
chai.use(chaiHttp);
chai.should();

export async function relate(subject: string, relation: string, object: string){
    (await chai.request(app).post('/relations/update').send({add: [{subject, relation, object}]})).should.have.status(200);
}

export async function unrelate(subject: string, relation: string, object: string){
    (await chai.request(app).post('/relations/update').send({remove: [{subject, relation, object}]})).should.have.status(200);
}

export async function check(subject: string, action: string, object: string){
    const response = await chai.request(app).get('/authorize?subject='+subject+'&action='+action+'&object='+object)
    response.should.have.status(200);
    response.body.should.be.a('boolean');
    return response.body;
}