'use strict';

var CallbackQueue = require('react/lib/CallbackQueue');
var PooledClass = require('react/lib/PooledClass');
var Transaction = require('react/lib/Transaction');
var assign = require('react/lib/Object.assign');

/**
 * Provides a `CallbackQueue` queue for collecting `onDOMReady` callbacks during
 * the performing of the transaction.
 */
var ON_DOM_READY_QUEUEING = {
    /**
     * Initializes the internal `onDOMReady` queue.
     */
    initialize: function() {
        this.reactMountReady.reset();
    },

    /**
     * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
     */
    close: function() {
        this.reactMountReady.notifyAll();
    }
};

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS = [ON_DOM_READY_QUEUEING];

/**
 * Currently:
 * - The order that these are listed in the transaction is critical:
 * - Suppresses events.
 *
 * @class ReactQmlReconcileTransaction
 */
function ReactQmlReconcileTransaction() {
    this.reinitializeTransaction();
    this.reactMountReady = CallbackQueue.getPooled(null);
}

var Mixin = {
    /**
     * @see Transaction
     * @abstract
     * @final
     * @return {Array<object>} List of operation wrap proceedures.
     *   TODO: convert to array<TransactionWrapper>
     */
    getTransactionWrappers: function() {
        return TRANSACTION_WRAPPERS;
    },

    /**
     * @return {object} The queue to collect `onDOMReady` callbacks with.
     *   TODO: convert to ReactMountReady
     */
    getReactMountReady: function() {
        return this.reactMountReady;
    },

    /**
     * `PooledClass` looks for this, and will invoke this before allowing this
     * instance to be reused.
     */
    destructor: function() {
        CallbackQueue.release(this.reactMountReady);
        this.reactMountReady = null;
    }
};

assign(
    ReactQmlReconcileTransaction.prototype,
    Transaction.Mixin,
    ReactQmlReconcileTransaction,
    Mixin
);

PooledClass.addPoolingTo(ReactQmlReconcileTransaction);

module.exports = ReactQmlReconcileTransaction;
