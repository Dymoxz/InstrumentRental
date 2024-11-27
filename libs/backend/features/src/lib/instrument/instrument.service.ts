import { Injectable, NotFoundException } from '@nestjs/common';
import { IInstrument, InstrumentType } from '@InstrumentRental/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class InstrumentService {
  TAG = 'InstrumentService';

  private instruments$ = new BehaviorSubject<IInstrument[]>([
    {
      id: '0',
      name: '1969 Gibson Les Paul',
      description: 'This is a true gem for vintage guitar lovers! A 1969 Gibson Les Paul with a stunning sunburst finish. It has some visible signs of wear and tear, which only add to its character and charm. The sound is absolutely phenomenal, with warm tones perfect for rock, blues, or even jazz. This guitar is well-maintained and ready to make your next gig or recording session unforgettable.',
      type: InstrumentType.string,
      brand: 'Gibson',
      model: 'Les Paul',
      pricePerDay: 30,
      available: true,
    },
    {
      id: '1',
      name: 'Yamaha U3 Upright Piano',
      description: 'A professional-grade Yamaha U3 Upright Piano available for hire. This piano has been lovingly cared for and has a polished ebony finish that looks stunning in any setting. It delivers a rich, resonant tone and smooth key action, making it perfect for professional performances, studio recordings, or even special events. Whether you’re an experienced pianist or looking to host a classy event, this piano won’t disappoint!',
      type: InstrumentType.keyboard,
      brand: 'Yamaha',
      model: 'U3',
      pricePerDay: 50,
      available: true,
    },
    {
      id: '2',
      name: 'Roland TR-909 Drum Machine',
      description: 'If you’re into electronic music, you know the TR-909 is an absolute legend. This iconic drum machine has shaped countless genres, from house to techno. It’s fully functional and in great condition, with that unmistakable analog punch combined with digital versatility. Ideal for producers, DJs, or even live performances—it’s ready to bring your beats to life.',
      type: InstrumentType.electronic,
      brand: 'Roland',
      model: 'TR-909',
      pricePerDay: 40,
      available: true,
    },
    {
      id: '3',
      name: 'Bach Stradivarius Trumpet',
      description: 'Calling all brass players! This Bach Stradivarius trumpet is a masterpiece. Known for its exceptional tonal clarity and dynamic range, it’s perfect for everything from classical performances to jazz gigs. It’s been professionally cleaned and maintained, ensuring it’s in top-notch condition for your next performance. Add this to your arsenal for a truly professional edge.',
      type: InstrumentType.brass,
      brand: 'Bach',
      model: 'Stradivarius',
      pricePerDay: 25,
      available: false,
    },
    {
      id: '4',
      name: 'Fender Precision Bass',
      description: 'A true workhorse of a bass guitar! This Fender Precision Bass is ideal for anyone looking for deep, punchy tones with incredible versatility. It’s in excellent condition, with a smooth neck and perfectly set-up action for comfortable play. Whether you’re grooving on stage, recording in the studio, or jamming with friends, this bass won’t let you down.',
      type: InstrumentType.string,
      brand: 'Fender',
      model: 'Precision Bass',
      pricePerDay: 35,
      available: true,
    },
    {
      id: '5',
      name: 'Pearl Export Series Drum Set',
      description: 'This Pearl Export Series drum kit is ready for your next gig or studio session! It’s a five-piece set that includes cymbals, hardware, and a kick pedal, offering everything you need to deliver a powerful performance. The drums are in fantastic condition, with a versatile sound that works for rock, pop, funk, or even jazz. Perfect for drummers who want a reliable, great-sounding kit without the hassle of transporting their own.',
      type: InstrumentType.percussion,
      brand: 'Pearl',
      model: 'Export Series',
      pricePerDay: 60,
      available: false,
    },
    {
      id: '6',
      name: 'Selmer Mark VI Alto Saxophone',
      description: 'A rare opportunity to play one of the most sought-after saxophones in the world! This Selmer Mark VI alto saxophone is renowned for its warm, rich tone and impeccable craftsmanship. Whether you’re performing jazz, classical, or even contemporary music, this instrument delivers the goods. It has been carefully maintained and is ready for your next concert or recording session.',
      type: InstrumentType.woodwind,
      brand: 'Selmer',
      model: 'Mark VI',
      pricePerDay: 45,
      available: true,
    },
    {
      id: '7',
      name: 'Korg Minilogue Polyphonic Synthesizer',
      description: 'Looking for a powerful yet compact synth for your next project? The Korg Minilogue is a versatile polyphonic synthesizer that’s perfect for both live performances and studio recordings. With its sleek design, intuitive controls, and warm analog sound, it’s ideal for creating everything from lush pads to punchy leads. In great condition and ready to take your sound to the next level!',
      type: InstrumentType.electronic,
      brand: 'Korg',
      model: 'Minilogue',
      pricePerDay: 40,
      available: true,
    },
    {
      id: '8',
      name: 'Ludwig Supraphonic Snare Drum',
      description: 'This Ludwig Supraphonic snare drum is a must-have for any drummer looking to achieve that classic, crisp snare tone. Known for its bright attack and sensitivity, it’s a favorite among professionals in rock, pop, and funk. The drum is in excellent condition, with a smooth chrome finish that looks as good as it sounds. Ready to rock your next gig or recording!',
      type: InstrumentType.percussion,
      brand: 'Ludwig',
      model: 'Supraphonic',
      pricePerDay: 20,
      available: true,
    },
    {
      id: '9',
      name: 'Martin D-28 Acoustic Guitar',
      description: 'Here’s your chance to play one of the most iconic acoustic guitars ever made—the Martin D-28. This guitar features a solid spruce top and rosewood back and sides, delivering a rich, full-bodied tone. Perfect for solo performances, studio recordings, or intimate gatherings. It’s been kept in excellent condition and is ready to inspire your next song.',
      type: InstrumentType.string,
      brand: 'Martin',
      model: 'D-28',
      pricePerDay: 40,
      available: false,
    },
  ]);


  getAll(): IInstrument[] {
    Logger.log('getAll', this.TAG);
    return this.instruments$.value;
  }

  getOne(id: string): IInstrument {
    Logger.log(`getOne(${id})`, this.TAG);
    const instrument = this.instruments$.value.find((td) => td.id === id);
    if (!instrument) {
      throw new NotFoundException(`Instrument could not be found!`);
    }
    return instrument;
  }

  /**
   * Update the arg signature to match the DTO, but keep the
   * return signature - we still want to respond with the complete
   * object
   */
  create(instrument: Pick<IInstrument,  'name' | 'description' | 'type' | 'brand' | 'model' | 'pricePerDay'>): IInstrument {
    Logger.log('create', this.TAG);
    const current = this.instruments$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
    const newInstrument: IInstrument = {
      ...instrument,
      id: `instrument-${Math.floor(Math.random() * 10000)}`,
      available: true
    };
    this.instruments$.next([...current, newInstrument]);
    return newInstrument;
  }
}
