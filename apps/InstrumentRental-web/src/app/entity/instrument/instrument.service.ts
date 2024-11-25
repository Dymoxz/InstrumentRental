import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Instrument, InstrumentType } from './instrument.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService {
  readonly instruments: Instrument[] = [
    {
      id: 0,
      name: 'Vintage Sunburst Electric Guitar',
      type: InstrumentType.guitar,
      brand: 'Fender',
      model: 'Stratocaster 1962 Reissue',
      description: "This iconic electric guitar boasts a classic vintage sunburst finish, capturing the timeless aesthetic of the 1962 Stratocaster. It features a resonant alder body, a comfortable maple neck with a rosewood fingerboard, and three vintage-style single-coil pickups that deliver that signature Strat tone – bright, articulate, and versatile. Perfect for blues, rock, and everything in between, this guitar offers a smooth playing experience and a rich, dynamic sound.",
      pricePerDay: 25,
      available: true,
    },
    {
      id: 1,
      name: 'Weighted Hammer Action Digital Piano',
      type: InstrumentType.keyboard,
      brand: 'Yamaha',
      model: 'P-515',
      description: "Experience the authentic feel of an acoustic piano with this high-end digital piano. The P-515 features Yamaha's premium NWX (Natural Wood X) keyboard with wooden white keys and synthetic ebony and ivory keytops, providing a realistic touch and response. It boasts the rich and expressive sounds of the flagship Yamaha CFX and Bösendorfer Imperial concert grand pianos, sampled meticulously for unparalleled realism. With built-in speakers, Bluetooth connectivity, and a wide range of voices and rhythms, this instrument is perfect for both practice and performance.",
      pricePerDay: 30,
      available: true,
    },
    {
      id: 2,
      name: 'Professional Silver Flute with B Footjoint',
      type: InstrumentType.blowingInstrument,
      brand: 'Pearl',
      model: 'Quantz 765RBE',
      description: "This exquisite silver flute is designed for the discerning musician. Featuring a solid silver headjoint, body, and footjoint, it produces a warm, rich tone with excellent projection. The B footjoint extends the flute's range, allowing for greater musical expression. The hand-finished keys and precise mechanism ensure smooth and responsive playability. Ideal for both solo performances and orchestral work, this flute offers a superior playing experience and a beautiful, resonant sound.",
      pricePerDay: 20,
      available: true,
    },
    {
      id: 3,
      name: 'Acoustic Dreadnought Guitar',
      type: InstrumentType.guitar,
      brand: 'Martin',
      model: 'D-28',
      description: "A legendary acoustic guitar known for its rich tone and powerful projection. The Martin D-28 features a solid Sitka spruce top and solid East Indian rosewood back and sides, delivering a balanced and resonant sound with deep basses and clear trebles. Its iconic dreadnought body shape provides a full and commanding tone, making it ideal for a wide range of styles. This guitar is a favorite among professionals and enthusiasts alike, prized for its craftsmanship and timeless sound.",
      pricePerDay: 35,
      available: true,
    },
    {
      id: 4,
      name: 'Synthesizer Workstation',
      type: InstrumentType.keyboard,
      brand: 'Korg',
      model: 'Kronos 2',
      description: "Unleash your creativity with this powerful synthesizer workstation. The Korg Kronos 2 offers nine distinct sound engines, including piano, electric piano, organ, digital synthesis, and more. It features a vast library of sounds, effects, and sequencing tools, allowing you to create complex and dynamic musical arrangements. The intuitive touchscreen interface and real-time controls make it easy to shape and manipulate sounds on the fly. Perfect for music production, live performance, and sound design.",
      pricePerDay: 40,
      available: true,
    },
    {
      id: 5,
      name: 'Professional Alto Saxophone',
      type: InstrumentType.blowingInstrument,
      brand: 'Yamaha',
      model: 'YAS-62',
      description: "A highly regarded alto saxophone known for its excellent playability and rich tone. The Yamaha YAS-62 features a redesigned neck for improved response and intonation, as well as durable construction and ergonomic keywork for comfortable playing. Its warm and expressive sound makes it suitable for a variety of musical genres, from jazz and blues to classical and pop. Whether you're a student or a professional, this saxophone offers a rewarding playing experience.",
      pricePerDay: 28,
      available: true,
    }
  ];


  constructor() {
    console.log('Service constructor aangeroepen');
  }
  getInstruments(): Instrument[] {
    console.log('getInstruments aangeroepen');
    return this.instruments;
  }

  getInstrumentAsObservable(): Observable<Instrument[]> {
    console.log('getInstrumentsAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.instruments);
  }

  getInstrumentById(id: number): Instrument {
    console.log('getInstrumentById aangeroepen');
    return this.instruments.filter((instrument) => instrument.id === id)[0];
  }
}
