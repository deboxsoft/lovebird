import { UserID } from '@deboxsoft/user-model';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AuctionID, BidID, BidInterface } from '@deboxsoft/lb-farm-model';

@Entity()
export class Bid implements BidInterface {
  @PrimaryGeneratedColumn('uuid')
  id: BidID;

  @Column('datetime')
  time: number;

  @Column()
  amount: number;

  auctionId: AuctionID;
  userId: UserID;
}
