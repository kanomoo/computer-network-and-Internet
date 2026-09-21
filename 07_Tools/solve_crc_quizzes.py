def crc_div(data_bits, divisor_bits):
    data = list(data_bits)
    divisor = list(divisor_bits)
    L = len(divisor)
    
    # Division trace
    steps = []
    curr = data[:]
    quotient = []
    
    for i in range(len(data) - L + 1):
        if curr[i] == '1':
            quotient.append('1')
            step_str = f"Bit {i}: XOR with {divisor_bits}"
            for j in range(L):
                curr[i + j] = '1' if curr[i + j] != divisor[j] else '0'
        else:
            quotient.append('0')
            
    remainder = "".join(curr[-(L - 1):])
    quotient_str = "".join(quotient)
    return remainder, quotient_str

print("--- Example 1 ---")
# Data: 100100, Divisor: 1101 (L=4, append 3 zeros -> 100100000)
rem, q = crc_div("100100000", "1101")
print(f"Data: 100100, Div: 1101 -> Rem: {rem} (Expected 001)")
# Receiver check
rem_rx, _ = crc_div("100100" + rem, "1101")
print(f"Receiver Remainder: {rem_rx} (Expected 000)")

print("\n--- Example 2 / Quiz 1 ---")
# Data: 11001001, Divisor: x^3 + 1 = 1001 (L=4, append 3 zeros -> 11001001000)
rem, q = crc_div("11001001000", "1001")
print(f"Data: 11001001, Div: 1001 -> Rem: {rem} (Expected 011)")
rem_rx, _ = crc_div("11001001" + rem, "1001")
print(f"Receiver Remainder: {rem_rx} (Expected 000)")

print("\n--- Quiz 2 ---")
# Data: 1110010101, Divisor: x^3 + x^2 + 1 = 1101 (L=4, append 3 zeros)
rem2, q2 = crc_div("1110010101000", "1101")
print(f"Quiz 2 Sender: Data: 1110010101, Div: 1101 -> Rem: {rem2}")
rem2_rx, _ = crc_div("1110010101" + rem2, "1101")
print(f"Quiz 2 Receiver Remainder: {rem2_rx}")

print("\n--- Quiz 3 ---")
# Data: 1010101010, Divisor: x^5 + x + 1 = 100011 (L=6, append 5 zeros)
rem3, q3 = crc_div("101010101000000", "100011")
print(f"Quiz 3 Sender: Data: 1010101010, Div: 100011 -> Rem: {rem3}")
rem3_rx, _ = crc_div("1010101010" + rem3, "100011")
print(f"Quiz 3 Receiver Remainder: {rem3_rx}")

print("\n--- Quiz 4 ---")
# Data: 1010001101, Divisor: x^5 + x^4 + x^2 + 1 = 110101 (L=6, append 5 zeros)
rem4, q4 = crc_div("101000110100000", "110101")
print(f"Quiz 4 Sender: Data: 1010001101, Div: 110101 -> Rem: {rem4}")
rem4_rx, _ = crc_div("1010001101" + rem4, "110101")
print(f"Quiz 4 Receiver Remainder: {rem4_rx}")
