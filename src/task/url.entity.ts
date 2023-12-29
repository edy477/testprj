import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("url")
export class UrlEntity {
    @PrimaryGeneratedColumn({type: 'int'})

    url_id: number;

    @Column({length:'200'})
    url_original:string;

    @Column({length: '100'})
    url_shortened:string;

    @Column({length: '100'})
    title:string;

    @Column()
    counter: number;








}