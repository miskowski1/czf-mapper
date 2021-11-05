import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MapperInterface } from '@models/mapper.interface';
import { iif, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireStore: AngularFirestore) {
  }

  public loadProducts(): Observable<any> {
    return of(environment.production).pipe(
      mergeMap(isProduction =>
        iif(() => isProduction, this.fireStore.collection<MapperInterface>('mappers').valueChanges().pipe(tap(_ => console.log('from firebase'))), of(this.mockData))
      )
    );
  }

  private mockData: MapperInterface[] = [
    {
      "name": "CREW MATTE STYLING CRM 3.38oz/100ml ",
      "ean": 669316044858
    },
    {
      "name": "AC CLASSIC 3 IN 1 CL1 250ml/8.45oz",
      "ean": 669316058220
    },
    {
      "name": "CREW CLASSIC 3 IN 1 33.8oz/1000ml",
      "ean": 669316058510
    },
    {
      "name": "AC FIRM HOLD STYLING GEL 250ml/8.45oz",
      "ean": 669316060506
    },
    {
      "name": "CREW CLASSIC SUPERGLUE 3.38oz/100ml",
      "ean": 669316061923
    },
    {
      "ean": 669316068991,
      "name": "CREW PRECISION BLEND SHAMP 8.4oz/250ml"
    },
    {
      "ean": 669316076026,
      "name": "CREW FIRM HOLD GEL 13.1oz/390ml"
    },
    {
      "ean": 669316076033,
      "name": "CREW FIRM HOLD GEL 3.3oz/100ml"
    },
    {
      "name": "CREW LIGHT HOLD GEL 8.4oz/250ml",
      "ean": 669316076057
    },
    {
      "name": "CREW 24HR DEODORANT BODYWSH 15.2oz/450ml",
      "ean": 669316078860
    },
    {
      "ean": 669316078877,
      "name": "CREW ANTI-DANDRUFF SHAMP 8.4oz/250ml"
    },
    {
      "name": "CREW NINE FRAGRANCE 75ml",
      "ean": 669316079010
    },
    {
      "ean": 669316080733,
      "name": "CREW GROOMING SPRAY 8.45oz/250ml"
    },
    {
      "name": "CREW LIQUID WAX 5.1oz/150ml",
      "ean": 669316093917
    },
    {
      "ean": 669316214848,
      "name": "CREW 3IN1 TEA TREE 15.2oz/450ml"
    },
    {
      "ean": 669316222034,
      "name": "CREW SSC FACE BALM SPF15 170ml INTL"
    },
    {
      "ean": 669316223062,
      "name": "CREW 3IN1 TEA TREE 33.8oz/1000ml"
    },
    {
      "name": "CREW 3IN1 TEA TREE 8.45oz/250ml",
      "ean": 669316223079
    },
    {
      "ean": 669316388327,
      "name": "CREW ALTERNATOR FINISHING SPRAY 100ml"
    },
    {
      "name": "CREW HEAVY HOLD POMADE 85g/3oz",
      "ean": 669316395400
    },
    {
      "name": "CREW WIN FRAGRANCE 100ml",
      "ean": 669316396674
    },
    {
      "ean": 669316401699,
      "name": "CREW BEARD SERUM 50ml / 1.7 fl oz"
    },
    {
      "ean": 669316404645,
      "name": "CREW SSC MOIST SHV CREAM 15.2oz/450ml"
    },
    {
      "name": "CREW SSC PRECISION SHV GEL 15.2oz/450ml",
      "ean": 669316404652
    },
    {
      "name": "CREW SSC ULTRA GLIDNG SHV OIL 1.7oz/50ml",
      "ean": 669316406076
    },
    {
      "ean": 669316406106,
      "name": "CREW SSC MOISTRNG SHV CRM 5.1oz/150ml"
    },
    {
      "name": "CREW SSC PROTECTIV SHV FOAM 10.1oz/300ml",
      "ean": 669316406120
    },
    {
      "ean": 669316406144,
      "name": "CREW SSC REVITALIZING TONER 5.1oz/150ml"
    },
    {
      "ean": 669316406168,
      "name": "CREW SSC PRECISION SHAVE GEL 5.1oz/150ml"
    },
    {
      "ean": 669316408063,
      "name": "AC FIBER CREAM CL1 100ml"
    },
    {
      "name": "CREW AMERICANA FRAGRANCE 3.3oz/100ml",
      "ean": 669316418291
    },
    {
      "name": "CREW TECHSERIES CNTRL FOAM 200ml",
      "ean": 669316418314
    },
    {
      "ean": 669316418321,
      "name": "CREW TECHSERIES TEXTURE FOAM 200ml"
    },
    {
      "ean": 669316418345,
      "name": "AC TECHSERIES BOOST SPRAY 200ml "
    },
    {
      "ean": 669316418420,
      "name": "CREW FIRM HOLD STYLING CREAM 100ml CL1"
    },
    {
      "ean": 669316434468,
      "name": "CREW FORTIFYNG SCALP TREATMENT 100ml"
    },
    {
      "name": "CREW BEARD FOAM CLEANSER 2.3oz/70ml",
      "ean": 669316434505
    },
    {
      "ean": 669316434512,
      "name": "CREW CREAM POMADE 3oz/85g"
    },
    {
      "ean": 669316434567,
      "name": "CREW FORTIFYING SHAMPOO 33.8oz/1000ml"
    },
    {
      "ean": 669316434574,
      "name": "CREW FORTIFYING SHAMPOO 8.4oz/250ml"
    },
    {
      "ean": 669316434673,
      "name": "CREW BEARD BALM 2.1oz/60g"
    },
    {
      "ean": 669316434802,
      "name": "CREW SSC POST-SH COOLING LOTION 150ml"
    },
    {
      "name": "CREW SSC CLASSIC MOISTRNG SH CREAM 150ml",
      "ean": 669316434819
    },
    {
      "ean": 669316457054,
      "name": "AC CREW FIBER FOAM 200ml"
    },
    {
      "ean": 669316457078,
      "name": "AC MATTE CLAY 3oz/85g"
    },
    {
      "name": "AC 2IN1 MOISTR & BEARD COND 100ML",
      "ean": 669316457108
    },
    {
      "name": "CREW MOUSTACHE WAX 15g/0.5oz",
      "ean": 669316475263
    },
    {
      "name": "AC SHAVE LATHER SHAVE CREAM 250ml/8.45oz",
      "ean": 738678000335
    },
    {
      "ean": 738678000991,
      "name": "AC DAILY CLEANS. SHAMPOO 450ml/15.2oz"
    },
    {
      "name": "AC DAILY CLEANS. SHAMPOO 1000ml",
      "ean": 738678001004
    },
    {
      "ean": 738678001035,
      "name": "AC DAILY MOIST. CONDITIONER 450ml/15.2oz"
    },
    {
      "ean": 738678001042,
      "name": "AC DAILY MOIST. CONDITIONER 1000ml"
    },
    {
      "name": "AC DAILY DEEP MOIST SHAMPOO 1000ml",
      "ean": 738678001059
    },
    {
      "ean": 738678001066,
      "name": "AC DAILY DEEP MOIST SHAMPOO 450ml/15.2oz"
    },
    {
      "ean": 738678001097,
      "name": "AC DETOX SHAMPOO 1000ml"
    },
    {
      "name": "AC DAILY MOIST. CONDITIONER 250ml/8.45oz",
      "ean": 738678001325
    },
    {
      "ean": 738678001349,
      "name": "AC AC D CLEANS. SHAMPOO 250ml/8.45oz"
    },
    {
      "name": "AC AC DETOX SHAMPOO 250ml/8.45oz",
      "ean": 738678001356
    },
    {
      "ean": 738678001370,
      "name": "AC DAILY DEEP MOIST SHAMPOO 250ml/8.45oz"
    },
    {
      "name": "CREW LIGHTHOLD TEXT LTN 8.45oz/250ml",
      "ean": 738678148907
    },
    {
      "ean": 738678151761,
      "name": "CREW POMADE 3oz/85g"
    },
    {
      "ean": 738678151846,
      "name": "CREW MEDIUM HOLD SPRAY GEL 8.45oz/250ml"
    },
    {
      "ean": 738678151853,
      "name": "CREW CLASSIC FIBER 3oz/85g"
    },
    {
      "ean": 738678174067,
      "name": "CREW POMADE 1.7oz/50g"
    },
    {
      "ean": 738678174074,
      "name": "CREW CLASSIC FIBER 1.7oz/50g"
    },
    {
      "name": "CREW CLASSIC GROOMING CREAM 3oz/85g",
      "ean": 738678174135
    },
    {
      "ean": 738678181690,
      "name": "CREW CLASSIC FORMING CREAM 3oz/85g"
    },
    {
      "name": "CREW CLASSIC FORMING CRM 1.7oz/50g",
      "ean": 738678184394
    },
    {
      "ean": 738678240755,
      "name": "CREW CLASSIC BODY WASH 15.2oz/450ml"
    },
    {
      "ean": 738678242025,
      "name": "CREW CLASSIC MOLDING CLAY 3oz/85g"
    },
    {
      "name": "CREW DEFINING PASTE 3oz/85g",
      "ean": 738678242520
    },
    {
      "ean": 738678246306,
      "name": "CREW GRAY SHAMPOO 8.45oz/250ml"
    },
    {
      "name": "CREW PRECISION BLEND PEROXDE 15VOL 450ml",
      "ean": 738678247778
    },
    {
      "name": "CREW PRECISION BLEND MEDIUM ASH 40ml(x3)",
      "ean": 738678248331
    },
    {
      "ean": 738678248348,
      "name": "CREW PRECISION BLEND MED NATUR 40ml (x3)"
    },
    {
      "name": "CREW PRECISION BLEND DARK 40ml (x3)",
      "ean": 738678248355
    },
    {
      "name": "CREW PRECISION BLEND LIGHT 40ml (x3)",
      "ean": 738678248362
    },
    {
      "ean": 738678250013,
      "name": "CREW CLASSIC BOOST POWDER 0.3oz/10g"
    },
    {
      "ean": 738678251416,
      "name": "AC CLASSIC 3 IN 1 CL1 450ml/15.2oz"
    },
    {
      "ean": 8432225113968,
      "name": "AC FINISHING SPRAY 200ml"
    },
    {
      "ean": 8432225113975,
      "name": "AC FINISHING SPRAY 500ml"
    }
  ];
}
