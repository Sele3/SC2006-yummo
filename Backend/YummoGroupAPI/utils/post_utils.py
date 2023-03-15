from rest_framework.exceptions import ValidationError,NotFound, PermissionDenied

def validate_customer_in_group(group, customer) -> None:
    """Validates whether the current `Customer` is part of the `YummoGroup`

    Args:
        group (`YummoGroup`): `YummoGroup` object
        customer (`Customer`): `Customer` object

    Raises:
        ValidationError: Message "You are not part of this group." with status code 400 (Bad Request).
    """
    if not group.customers.filter(id=customer.id).exists():
        raise ValidationError({"message": "You are not part of this group."})
    

def validate_post_in_group(group, post) -> None:
    """Validates whether the `Post` exists in the `YummoGroup` 

    Args:
        group (`YummoGroup`): `YummoGroup` object
        post (`Post`): `Post` object

    Raises:
        Http404: Message "Post does not belong to this group." with status code 404 (Not Found).
    """
    if post.group != group:
        raise NotFound(detail="Post does not belong to this group.", code=404)
    

def validate_post_created_by_customer(post, customer):
    """Validates whether the `Post` is created by the `Customer`

    Args:
        post (`Post`): `Post` object
        customer (`Customer`): `Customer`

    Raises:
        PermissionDenied: Message "You are not the creator of this post." with status code 403 (Forbidden).
    """
    if post.customer != customer:
        raise PermissionDenied(detail="You are not the creator of this post.", code=403)
    