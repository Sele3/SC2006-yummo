from rest_framework.exceptions import ValidationError

def validate_customer_in_group(group, customer) -> None:
    """Validates whether the current `Customer` is part of the `YummoGroup`

    Args:
        group (`YummoGroup`): `YummoGroup` object
        customer (`Customer`): `Customer` object

    Raises:
        ValidationError: Message "[Username] is not part of this group." with status code 400 (Bad Request).
    """
    if not group.customers.filter(id=customer.id).exists():
        raise ValidationError({"message": f"{customer.username} is not part of this group."}, code=400)
    