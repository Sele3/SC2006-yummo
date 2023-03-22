from rest_framework.exceptions import NotFound, PermissionDenied

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
    

def validate_post_by_customer(post, customer):
    """Validates whether the `Post` is created by the `Customer`

    Args:
        post (`Post`): `Post` object
        customer (`Customer`): `Customer`

    Raises:
        PermissionDenied: Message "You are not the creator of this post." with status code 403 (Forbidden).
    """
    if post.customer != customer:
        raise PermissionDenied(detail="You are not the creator of this post.", code=403)
    