import requests
import logging
from typing import List, Dict, Any

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s: %(message)s',
    filename='api_validation_log.txt',
    filemode='w'
)
logger = logging.getLogger(__name__)


def fetch_posts() -> List[Dict[Any, Any]]:
    try:
        response = requests.get('https://jsonplaceholder.typicode.com/posts')
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error(f"API Request Failed: {e}")
        return []


def validate_post(post: Dict[Any, Any]) -> bool:
    try:
        # Check title
        if not post.get('title') or not post.get('title').strip():
            logger.warning(f"Empty title for post {post.get('id')}")
            return False

        # Check body
        if not post.get('body') or not post.get('body').strip():
            logger.warning(f"Empty body for post {post.get('id')}")
            return False

        # Check userId
        if not isinstance(post.get('userId'), int):
            logger.warning(f"Invalid userId for post {post.get('id')}")
            return False

        return True
    except Exception as e:
        logger.error(f"Validation error for post {post.get('id')}: {e}")
        return False


def validate_posts(posts: List[Dict[Any, Any]]) -> None:
    valid_posts = []
    invalid_posts = []

    for post in posts:
        if validate_post(post):
            valid_posts.append(post)
        else:
            invalid_posts.append(post)

    logger.info(f"Total Posts: {len(posts)}")
    logger.info(f"Valid Posts: {len(valid_posts)}")
    logger.info(f"Invalid Posts: {len(invalid_posts)}")


def main():
    posts = fetch_posts()
    validate_posts(posts)


if __name__ == "__main__":
    main()