

seat_plan = {
    "ALEX DEVKOTA": "A-D09",
    "BIMAL PANDEY": "A-D18",
    "AMAN GURUNG": "A-D27",
    "ARIYA TIMSINA": "A-D36",
    "ALEX SHARMA": "A-D45",
    "BISHWAS RANA MAGAR": "A-D08",
    "DHIRAJ DHUNGANA": "A-D17",
    "ISHAN K.C.": "A-D26",
    "DIPESH THAPA": "A-D35",
    "BIPANA TIMILSINA": "A-D44",
    "ANUSKA BHATTARAI": "A-D07",
    "KUSHAL PALIKHE": "A-D16",
    "MANASBI KARKI": "A-D25",
    "KARINA THAPA": "A-D34",
    "APEEL RAJ ADHIKARI": "A-D43",
    "HIRAMANI PUN": "A-D06",
    "MILAN THAPA": "A-D15",
    "MELINA CHHETRI": "A-D24",
    "MANISH GURUNG": "A-D33",
    "KAMALA KUMARI GURUNG": "A-D42",
    "KUSHAL GIRI": "A-D05",
    "NIRAJAN KARKI": "A-D14",
    "PRASEN KARKI": "A-D23",
    "PRATIK GURUNG": "A-D32",
    "NISHU GURUNG": "A-D41",
    "PRATIK PANTA": "A-D04",
    "RACHIT PANDEY": "A-D13",
    "SIDDHARTHA MALLA": "A-D22",
    "RESHAB JAISHWAL": "A-D31",
    "PRANISH POUDEL": "A-D40",
    "SANJEEP MAGAR": "A-D03",
    "SARTHAK GHIMIRE": "A-D12",
    "SUSHAN GURUNG": "A-D21",
    "SUGAM BASTOLA": "A-D30",
    "ROJAN SHRESTHA": "A-D39",
    "SAMIR THAPA": "A-D02",
    "SUYOG LUITEL": "A-D11",
    "UTSHAB KANDEL": "A-D20",
    "SUSHIL BARUWAL": "A-D38",
    "ASHRIK KAYASTHA": "A-D01",
    "SAMBRIDDHI BARAL": "A-D10",
    "AYUSH GURUNG": "A-D19",
    "SABINA RANABHAT": "A-D28",
    "ASMIT BHUJEL": "A-D37"
}

# Exam metadata
room_name = "LT02-Annapurna, Nepal Block"
exam_date = "31 March 2025"
exam_time = "03:15 PM - 05:15 PM"

# Search input
student_name = input("Enter student name: ").strip().upper()

# Search and display
if student_name in seat_plan:
    print("\n--- Student Seat Info ---")
    print(f"Name       : {student_name.title()}")
    print(f"Desk No.   : {seat_plan[student_name]}")
    print(f"Room       : {room_name}")
    print(f"Date & Time: {exam_date} ({exam_time})")
else:
    print("Student not found in the seat plan.")
