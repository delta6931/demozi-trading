import sys
from PIL import Image

def upscale_image(input_path, output_path, scale_factor=2):
    try:
        with Image.open(input_path) as img:
            # Calculate new dimensions
            width, height = img.size
            new_width = int(width * scale_factor)
            new_height = int(height * scale_factor)
            
            # Upscale using high-quality Lanczos filter
            upscaled_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Save the result with high quality
            upscaled_img.save(output_path, quality=95)
            print(f"Successfully upscaled {input_path} by {scale_factor}x to {new_width}x{new_height}")
    except Exception as e:
        print(f"Error upscaling image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    upscale_image('assets/fisher_raw.jpg', 'assets/fisher_banner.jpg', scale_factor=3)
