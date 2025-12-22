import supabase from "@/app/supabaseClient";

export const createOrder = async (cartItems, cartTotal, userId, shippingAddressId) => {

  // Create the order first
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_amount: cartTotal,
      shipping_address_id: shippingAddressId,
      status: 'pending'
    })
    .select('id')
    .single();

  if (orderError) {
    console.error('Order creation failed:', orderError);
    throw new Error('Failed to create order');
  }

  // Prepare order items data from cart state
  const orderItemsData = cartItems.map(item => ({
    order_id: order[0].id,
    product_id: item.id,
    quantity: item.quantity,
    price_at_order: item.productPrice,
    // Add any additional product details you want to preserve
    product_name: item.productName,
    product_image: item.productImage
  }));

  // Insert all order items at once
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsData);

  if (itemsError) {
    console.error('Order items creation failed:', itemsError);
    
    // Rollback order creation if items fail
    await supabase
      .from('orders')
      .delete()
      .eq('id', order.id);
    
    throw new Error('Failed to add items to order');
  }

  return order.id;
};