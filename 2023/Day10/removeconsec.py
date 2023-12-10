def compress_list(nums):
    if not nums:
        return []

    compressed = []
    start = end = nums[0]

    for num in nums[1:]:
        if num == end + 1:
            end = num
        else:
            compressed.append(end)
            start = end = num

    compressed.append(end)
    return compressed

numbers = [2, 4, 5, 6, 9]
compressed_numbers = compress_list(numbers)
print(compressed_numbers)  # Output should be [2, 6, 9]