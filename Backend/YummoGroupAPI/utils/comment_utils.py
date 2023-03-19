from rest_framework.exceptions import ValidationError, PermissionDenied

def validate_comment_in_post(comment, post) -> None:
    """Validates whether the `Comment` belongs to the current `Post`

    Args:
        comment (`Comment`): `Comment` object
        post (`Post`): `Post` object

    Raises:
        ValidationError: Message "This comment does not belong to the current post." with status code 400 (Bad Request)
    """
    if comment.post != post:
        raise ValidationError({"message": "This comment does not belong to the current post."}, code=400)
    

def validate_comment_by_customer(comment, customer):
    """Validates whether the `Comment`` is created by the `Customer`

    Args:
        comment (`Comment`): `Comment` object
        customer (`Customer`): `Customer` object

    Raises:
        PermissionDenied: Message "You are not the creator of this comment." with status code 403 (Forbidden).
    """
    if comment.user != customer:
        raise PermissionDenied(detail="You are not the creator of this comment.", code=403)
    