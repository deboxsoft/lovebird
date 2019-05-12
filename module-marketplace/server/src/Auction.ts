import { UserID } from '@deboxsoft/user-model';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BidID, AuctionID, AuctionInterface, Status } from '@deboxsoft/lb-farm-model';

@Entity()
export class Auction implements AuctionInterface {
  @PrimaryGeneratedColumn('uuid')
  id: AuctionID;

  @Column('datetime')
  startTime: number;

  @Column('datetime')
  endTime: number;

  @Column()
  openBid: number;

  @Column()
  closeBid: number;

  @Column()
  currentBid: number;

  @Column()
  incrementBid: number;

  @Column()
  description: string;

  bidsId: BidID[];

  winnerId: UserID;

  @Column()
  photo: string[];

  @Column()
  status: Status;
}
