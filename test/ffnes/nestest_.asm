C004 78 SEI
C005 D8 CLD
C006 A2 FF LDX #FF
C008 9A TXS
C009 AD 02 20 LDA $2002
C00C 10 FB BPL $C009
C00E AD 02 20 LDA $2002
C011 10 FB BPL $C00E
C013 A9 00 LDA #00
C015 8D 00 20 STA $2000
C018 8D 01 20 STA $2001
C01B 8D 05 20 STA $2005
C01E 8D 05 20 STA $2005
C021 AD 02 20 LDA $2002
C024 A2 20 LDX #20
C026 8E 06 20 STX $2006
C029 A2 00 LDX #00
C02B 8E 06 20 STX $2006
C02E A2 00 LDX #00
C030 A0 0F LDY #0F
C032 A9 00 LDA #00
C034 8D 07 20 STA $2007
C037 CA DEX
C038 D0 FA BNE $C034
C03A 88 DEY
C03B D0 F7 BNE $C034
C03D A9 3F LDA #3F
C03F 8D 06 20 STA $2006
C042 A9 00 LDA #00
C044 8D 06 20 STA $2006
C047 A2 00 LDX #00
C049 BD 78 FF LDA $FF78, X
C04C 8D 07 20 STA $2007
C04F E8 INX
C050 E0 20 CPX #20
C052 D0 F5 BNE $C049
C054 A9 C0 LDA #C0
C056 8D 17 40 STA $4017
C059 A9 00 LDA #00
C05B 8D 15 40 STA $4015
C05E A9 78 LDA #78
C060 85 D0 STA $D0
C062 A9 FB LDA #FB
C064 85 D1 STA $D1
C066 A9 7F LDA #7F
C068 85 D3 STA $D3
C06A A0 00 LDY #00
C06C 8C 06 20 STY $2006
C06F 8C 06 20 STY $2006
C072 A9 00 LDA #00
C074 85 D7 STA $D7
C076 A9 07 LDA #07
C078 85 D0 STA $D0
C07A A9 C3 LDA #C3
C07C 85 D1 STA $D1
C07E 20 A7 C2 JSR $C2A7
C081 20 8D C2 JSR $C28D
C084 A2 12 LDX #12
C086 20 61 C2 JSR $C261
C089 A5 D5 LDA $D5
C08B 4A LSR A
C08C 4A LSR A
C08D 4A LSR A
C08E B0 1C BCS $C0AC
C090 4A LSR A
C091 B0 0C BCS $C09F
C093 4A LSR A
C094 B0 27 BCS $C0BD
C096 4A LSR A
C097 B0 03 BCS $C09C
C099 4C 81 C0 JMP $C081
C09C 4C 26 C1 JMP $C126
C09F 20 6F C6 JSR $C66F
C0AC 20 6F C6 JSR $C66F
C0AF E6 D7 INC $D7
C0B1 A5 D7 LDA $D7
C0B3 C9 0E CMP #0E
C0B5 90 CA BCC $C081
C0B7 A9 00 LDA #00
C0B9 85 D7 STA $D7
C0BB F0 C4 BEQ $C081
C0BD 20 89 C6 JSR $C689
C0C0 A5 D7 LDA $D7
C0C2 F0 06 BEQ $C0CA
C0C4 20 ED C0 JSR $C0ED
C0CA A9 00 LDA #00
C0CC 85 D8 STA $D8
C0CE E6 D7 INC $D7
C0D0 20 ED C0 JSR $C0ED
C0ED A5 D7 LDA $D7
C0EF 0A ASL A
C0F0 AA TAX
C0F1 BD 0A C1 LDA $C10A, X
C0F4 8D 00 02 STA $0200
C0F7 BD 0B C1 LDA $C10B, X
C0FA 8D 01 02 STA $0201
C0FD A9 C1 LDA #C1
C0FF 48 PHA
C100 A9 DE LDA #DE
C102 48 PHA
C103 A9 00 LDA #00
C105 85 00 STA $00
C107 6C 00 02 JMP ($0200)
C10A 2D C7 2D AND $2DC7
C10D C7 DB DCP $DB
C10F C7 85 DCP $85
C111 C8 INY
C112 DE CB F8 DEC $F8CB, X
C115 CD EE CE CMP $CEEE
C118 A2 CF LDX #CF
C11A  NOP $D1, X
C11C FB D4 D4 ISC $D4D4, Y
C11F C1 4A CMP ($4A, X)
C121 DF B8 DB DCP $DBB8, X
C124 AA TAX
C125 E1 A9 SBC ($A9, X)
C126 A9 00 LDA #00
C127 00 BRK
C128 85 D7 STA $D7
C12A A9 92 LDA #92
C12C 85 D0 STA $D0
C12E A9 C4 LDA #C4
C130 85 D1 STA $D1
C132 20 A7 C2 JSR $C2A7
C261 A5 D7 LDA $D7
C263 18 CLC
C264 69 04 ADC #04
C266 A8 TAY
C267 A9 84 LDA #84
C269 8D 00 20 STA $2000
C26C A9 20 LDA #20
C26E 8D 06 20 STA $2006
C271 A9 02 LDA #02
C273 8D 06 20 STA $2006
C276 A9 20 LDA #20
C278 88 DEY
C279 C8 INY
C27A D0 02 BNE $C27E
C27C A9 2A LDA #2A
C27E 8D 07 20 STA $2007
C281 88 DEY
C282 CA DEX
C283 D0 F1 BNE $C276
C285 A9 80 LDA #80
C287 8D 00 20 STA $2000
C28A 4C 94 C2 JMP $C294
C28D A5 D2 LDA $D2
C28F C5 D2 CMP $D2
C291 F0 FC BEQ $C28F
C293 60 RTS
C294 A9 00 LDA #00
C296 8D 05 20 STA $2005
C299 8D 05 20 STA $2005
C29C A9 00 LDA #00
C29E 8D 06 20 STA $2006
C2A1 A9 00 LDA #00
C2A3 8D 06 20 STA $2006
C2A6 60 RTS
C2A7 A9 00 LDA #00
C2A9 8D 00 20 STA $2000
C2AC 8D 01 20 STA $2001
C2AF 20 ED C2 JSR $C2ED
C2B2 A9 20 LDA #20
C2B4 8D 06 20 STA $2006
C2B7 A0 00 LDY #00
C2B9 8C 06 20 STY $2006
C2BC A2 20 LDX #20
C2BE B1 D0 LDA ($F0D0), Y
C2C0 F0 20 BEQ $C2E2
C2C2 C9 FF CMP #FF
C2C4 F0 0D BEQ $C2D3
C2C6 8D 07 20 STA $2007
C2C9 C8 INY
C2CA D0 02 BNE $C2CE
C2CC E6 D1 INC $D1
C2CE CA DEX
C2CF D0 ED BNE $C2BE
C2D1 F0 E9 BEQ $C2BC
C2D3 C8 INY
C2D4 D0 02 BNE $C2D8
C2D6 E6 D1 INC $D1
C2D8 A9 20 LDA #20
C2DA 8D 07 20 STA $2007
C2DD CA DEX
C2DE D0 F8 BNE $C2D8
C2E0 F0 DA BEQ $C2BC
C2E2 A9 80 LDA #80
C2E4 8D 00 20 STA $2000
C2E7 A9 0E LDA #0E
C2E9 8D 01 20 STA $2001
C2EC 60 RTS
C2ED A9 20 LDA #20
C2EF 8D 06 20 STA $2006
C2F2 A9 00 LDA #00
C2F4 8D 06 20 STA $2006
C2F7 A2 1E LDX #1E
C2F9 A9 20 LDA #20
C2FB A0 20 LDY #20
C2FD 8D 07 20 STA $2007
C300 88 DEY
C301 D0 FA BNE $C2FD
C303 CA DEX
C304 D0 F5 BNE $C2FB
C306 60 RTS
C5AF 48 PHA
C5B0 8A TXA
C5B1 48 PHA
C5B2 AD 02 20 LDA $2002
C5B5 A9 20 LDA #20
C5B7 8D 06 20 STA $2006
C5BA A9 40 LDA #40
C5BC 8D 06 20 STA $2006
C5BF E6 D2 INC $D2
C5C1 A9 00 LDA #00
C5C3 8D 05 20 STA $2005
C5C6 8D 05 20 STA $2005
C5C9 A9 00 LDA #00
C5CB 8D 06 20 STA $2006
C5CE A9 00 LDA #00
C5D0 8D 06 20 STA $2006
C5D3 A2 09 LDX #09
C5D5 8E 16 40 STX $4016
C5D8 CA DEX
C5D9 8E 16 40 STX $4016
C5DC AD 16 40 LDA $4016
C5DF 4A LSR A
C5E0 26 D4 ROL $D4
C5E2 CA DEX
C5E3 D0 F7 BNE $C5DC
C5E5 A5 D4 LDA $D4
C5E7 AA TAX
C5E8 45 D6 EOR $D6
C5EA 25 D4 AND $D4
C5EC 85 D5 STA $D5
C5EE 86 D6 STX $D6
C5F0 68 PLA
C5F1 AA TAX
C5F2 68 PLA
C5F3 40 RTI
C5F4 40 RTI
C66F A9 03 LDA #03
C671 8D 15 40 STA $4015
C674 A9 87 LDA #87
C676 8D 00 40 STA $4000
C679 A9 89 LDA #89
C67B 8D 01 40 STA $4001
C67E A9 F0 LDA #F0
C680 8D 02 40 STA $4002
C683 A9 00 LDA #00
C685 8D 03 40 STA $4003
C688 60 RTS
C689 A9 02 LDA #02
C68B 8D 15 40 STA $4015
C68E A9 3F LDA #3F
C690 8D 04 40 STA $4004
C693 A9 9A LDA #9A
C695 8D 05 40 STA $4005
C698 A9 FF LDA #FF
C69A 8D 06 40 STA $4006
C69D A9 00 LDA #00
C69F 8D 07 40 STA $4007
C6A2 60 RTS