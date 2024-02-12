# import datetime

# # Assuming dt is your datetime object
# dt = datetime.datetime.now()

# # Extract the month from the datetime object
# month = dt.month
# day = dt.day
# hours = dt.hour
# minutes = dt.minute
# seconds = dt.second

# month = str(month)
# day = str(day)
# hours = str(hours)
# minutes = str(minutes)
# seconds = str(seconds)

# formatted_time = ":".join([hours, minutes, seconds])

# print(formatted_time)
# print(month)
# print(dt)

# import base64

# # Function to convert image to Base64 byte array
# def image_to_byte_array(image_path):
#     with open(image_path, "rb") as img_file:
#         return base64.b64encode(img_file.read())

# # Function to convert Base64 byte array to image
# def byte_array_to_image(byte_array, output_image_path):
#     img_data = base64.b64decode(byte_array)
#     with open(output_image_path, "wb") as img_file:
#         img_file.write(img_data)

# # Convert image to Base64 byte array
# image_path = "test.jpeg"
# byte_array = image_to_byte_array(image_path)

# # Convert Base64 byte array back to image
# output_image_path = "testingo.jpeg"
# byte_array_to_image(byte_array, output_image_path)
import datetime

time = "2021-06-01 12:00:00.000000"
# Parse the time string to datetime object
time_obj = datetime.datetime.strptime(time, "%Y-%m-%d %H:%M:%S.%f")

# Extract the time only
time_only = time_obj.time()
print(time_only)