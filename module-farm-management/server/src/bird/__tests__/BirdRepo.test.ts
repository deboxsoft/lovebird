import * as moment from 'moment';
import { BirdRepo } from '../BirdRepo';
import { start, stop, getConnection } from './connection';

const getBirdRepo = async (): Promise<BirdRepo> => await getConnection().getCustomRepository(BirdRepo);

describe('BirdRepo', () => {
  beforeAll(async () => {
    await start();
  });

  afterAll(async () => {
    await stop();
  });

  it('cek instance BirdRepo dpt instance tanpa error', async () => {
    const bird = await getConnection()
      .getCustomRepository(BirdRepo)
      .createAndSave({
        ring: 'ring1',
        name: 'name',
        colorMutation: 'biola',
        birthByFarmId: 'farm1',
        birth: moment().unix(),
        farmId: 'farm',
        gender: 'unsex',
        parentId: 'parent',
        speciesId: 1
      });
    expect(bird.ring).toBe('ring1');
  });

  it('cek age', async () => {
    const birdRepo = await getBirdRepo();
    const bird = await birdRepo.findOne('ring1');
    const { birth } = bird;
    bird.age = 1;
    const _bird = await birdRepo.save(bird);
    expect(_bird.age).toBe(_bird.age);
    expect(_bird.birth).not.toEqual(birth);
    expect(bird).toEqual(_bird);
  });

  it('cek add photo', async () => {
    const bird = await getConnection()
      .getCustomRepository(BirdRepo)
      .addPhoto('ring1', 'photo1');
    expect(bird.photo).toEqual(['photo1']);
  });

  it('cek remove bird', async () => {
    const birdRepo = await getBirdRepo();
    let bird = await birdRepo.findOne('ring1');
    const _bird = await birdRepo.remove(bird);
    expect(bird).toBe(_bird);
    bird = await birdRepo.findOne('ring1');
    expect(bird).toBeUndefined();
  });
});
