// Generated by dts-bundle v0.7.3

declare module 'pulse-framework' {
    export * from 'pulse-framework/internal';
    import { Pulse } from 'pulse-framework/internal';
    export default Pulse;
}

declare module 'pulse-framework/internal' {
    export { Pulse } from 'pulse-framework/pulse';
    export { State, StateGroup } from 'pulse-framework/state';
    export { Computed } from 'pulse-framework/computed';
    export { Collection } from 'pulse-framework/collection/collection';
    export { Group } from 'pulse-framework/collection/group';
    export { Selector } from 'pulse-framework/collection/selector';
    export { Data } from 'pulse-framework/collection/data';
    export { Controller } from 'pulse-framework/controller';
    export { Event } from 'pulse-framework/event';
    export { StatusTracker } from 'pulse-framework/status';
    export { API } from 'pulse-framework/api/api';
    export { Runtime } from 'pulse-framework/runtime';
    export { Storage } from 'pulse-framework/storage';
    export { Dep } from 'pulse-framework/dep';
    export { SubController, ComponentContainer, CallbackContainer } from 'pulse-framework/sub';
    export { use } from 'pulse-framework/integrations/use';
    export { usePulse, useEvent } from 'pulse-framework/integrations/react.integration';
    export { PulseHOC } from 'pulse-framework/integrations/react.integration';
    export { cleanState, resetState } from 'pulse-framework/utils';
    export { persist } from 'pulse-framework/storage';
    export { extractAll } from 'pulse-framework/helpers/extractAll';
    export { isWatchableObject } from 'pulse-framework/helpers/isWatchableObj';
    export { SetFunc } from 'pulse-framework/state';
    export { SubscriptionContainer } from 'pulse-framework/sub';
    export { PulseResponse } from 'pulse-framework/api/api';
    export { PrimaryKey, GroupName, GroupAddOptions } from 'pulse-framework/collection/group';
    export { ControllerConfig, FuncObj, StateObj } from 'pulse-framework/controller';
    export { StorageConfig } from 'pulse-framework/storage';
    export { EventPayload, EventConfig, EventsObjFunc, EventCallbackFunc } from 'pulse-framework/event';
    export { APIConfig } from 'pulse-framework/api/api';
    export { GroupObj, DefaultDataItem, SelectorObj, Config } from 'pulse-framework/collection/collection';
    export { Integration } from 'pulse-framework/integrations/use';
}

declare module 'pulse-framework/pulse' {
    import { State, Computed, Collection, GroupObj, DefaultDataItem, SelectorObj, Config, SubController, Runtime, Storage, Event, EventPayload, EventConfig, EventsObjFunc, StorageConfig, API, APIConfig, Group, Controller, ControllerConfig, StatusTracker, Integration } from 'pulse-framework/internal';
    export interface PulseConfig {
            computedDefault?: any;
            waitForMount?: boolean;
            framework?: any;
            frameworkConstructor?: any;
            storage?: StorageConfig;
            logJobs?: boolean;
            noCore?: boolean;
    }
    export const defaultConfig: PulseConfig;
    interface ErrorObject {
            code: number;
            message: string;
            action: Function;
            raw: any;
    }
    export class Pulse {
            config: PulseConfig;
            ready: boolean;
            runtime: Runtime;
            status: StatusTracker;
            storage: Storage;
            controllers: {
                    [key: string]: any;
            };
            subController: SubController;
            errorHandlers: Set<(error: ErrorObject) => void>;
            integration: Integration;
            constructor(config?: PulseConfig);
            Core<CoreType>(core?: CoreType): CoreType;
            Controller<O extends Partial<ControllerConfig>>(config: Partial<O>): Controller<O>;
            /**
                * Create Pulse state
                * @param initialState Any - the value to initialize a State instance with
                */
            State<T>(initial: T): State<T>;
            /**
                * Create a Pulse computed function
                * @param deps Array - An array of state items to depend on
                * @param func Function - A function where the return value is the state, ran every time a dep changes
                */
            Computed<T = any>(func: () => any, deps?: Array<any>): Computed<T>;
            /**
                * Create a Pulse collection with automatic type inferring
                * @param config object | function returning object
                * @param config.primaryKey string - The primary key for the collection.
                * @param config.groups object - Define groups for this collection.
                */
            Collection<DataType = DefaultDataItem>(): <G = GroupObj, S = SelectorObj>(config: Config<DataType, G, S>) => Collection<DataType, G, S>;
            /**
                * Create a Pulse Action
                */
            Action(func: Function): () => any;
            /**
                * Create Pulse API
                * @param config Object
                * @param config.options Object - Typescript default: RequestInit (headers, credentials, mode, etc...)
                * @param config.baseURL String - Url to prepend to endpoints (without trailing slash)
                * @param config.timeout Number - Time to wait for request before throwing error
                */
            API(config: APIConfig): API;
            /**
                * Create a Pulse Event
                */
            Event<P = EventPayload>(config?: EventConfig<P>): Event<P>;
            /**
                * Create multiple Pulse Events simultaneously while maintaining type safety
                */
            EventGroup<E extends EventsObjFunc>(eventsFunc?: E): ReturnType<E>;
            Storage(config: StorageConfig): void;
            /**
                * Create many Pulse states at the same time
                * @param stateGroup Object with keys as state name and values as initial state
                */
            StateGroup(stateGroup: any): any;
            /**
                * Create a Pulse Error
                */
            Error(error: any, code?: string): void;
            /**
                * Reset to initial state.
                * - Supports: State, Collections and Groups
                * - Removes persisted state from storage.
                * @param Items Array of items to reset
                */
            reset(items: Array<State | Group | Collection>): void;
            /**
                * onError handler
                */
            onError(handler: (error: ErrorObject) => void): void;
            /**
                * nextPulse helper function
                */
            nextPulse(callback: () => any): void;
            initFrameworkIntegration(frameworkConstructor: any): void;
            with(frameworkConstructor: any): this;
            setStorage(config: StorageConfig): void;
    }
    export default Pulse;
}

declare module 'pulse-framework/state' {
    import { Pulse, Dep } from 'pulse-framework/internal';
    export class State<ValueType = any> {
            instance: () => Pulse;
            initialState: any;
            name?: string;
            _value: ValueType;
            get value(): ValueType;
            dep: Dep;
            watchers?: {
                    [key: string]: any;
            };
            previousState: ValueType;
            nextState: ValueType;
            isSet: boolean;
            persistState: boolean;
            typeOfVal?: string;
            sideEffects?: Function;
            output?: any;
            set bind(value: ValueType);
            get bind(): ValueType;
            get exists(): boolean;
            constructor(instance: () => Pulse, initialState: any, deps?: Array<Dep>);
            /**
                * Directly set state to a new value, if nothing is passed in State.nextState will be used as the next value
                * @param newState - The new value for this state
                */
            set(newState?: ValueType | SetFunc<ValueType>, options?: {
                    background?: boolean;
            }): this;
            getPublicValue(): ValueType;
            patch(targetWithChange: any, config?: {
                    deep?: boolean;
            }): this;
            interval(setFunc: (currentValue: any) => any, ms?: number): this;
            persist(key?: string): this;
            /**
                * @public
                * Create a watcher that will fire a callback then destroy itself after invoking
                */
            onNext(callback: (value: ValueType) => void): void;
            /**
                * @public
                * Set a name for this State, required to persist
                */
            key(key: string): this;
            /**
                * @public
                * Fix the type to one of 'String', 'Boolean', 'Array', 'Object' or 'Number'
                */
            type(type: TypeString | TypeConstructor): this;
            /**
                * @public
                * Watch state for changes, run callback on each change
                */
            watch(key: number | string, callback: (value: any) => void): this;
            /**
                * @public
                * Remove watcher by key
                */
            removeWatcher(key: number | string): this;
            /**
                * @public
                * Restore previous state
                */
            undo(): void;
            /**
                * @public
                * If State is boolean, invert
                */
            toggle(): this;
            /**
                * @public
                * Reset the State to as declared
                */
            reset(): this;
            /**
                * @public
                * Returns a copy of the current value, objects and arrays will be cloned
                */
            copy(): any;
            /**
                * @public
                * Is the value equal to parameter
                */
            is(x: any): boolean;
            /**
                * @public
                * Is the value not equal to parameter
                */
            isNot(x: any): boolean;
            /**
                * @internal
                * Write value directly to State
                */
            privateWrite(value: any): void;
            /**
                * @internal
                *
                */
            destroy(): void;
            /**
                * @internal
                *
                */
            getPersistableValue(): any;
    }
    export type StateGroupDefault = {
            [key: string]: State | any;
    };
    export const StateGroup: (instance: () => Pulse, stateGroup: Object) => any;
    export default State;
    export type SetFunc<ValueType> = (state: ValueType) => ValueType;
    type TypeString = 'string' | 'boolean' | 'array' | 'object' | 'number';
    type TypeConstructor = StringConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor | NumberConstructor;
}

declare module 'pulse-framework/computed' {
    import { Pulse, State, SetFunc } from 'pulse-framework/internal';
    export class Computed<ComputedValueType = any> extends State<ComputedValueType> {
        instance: () => Pulse;
        func: () => ComputedValueType;
        deps?: Array<State>;
        set value(val: ComputedValueType);
        get value(): ComputedValueType;
        set bind(val: ComputedValueType);
        constructor(instance: () => Pulse, func: () => ComputedValueType, deps?: Array<State>);
        computeValue(): ComputedValueType | SetFunc<ComputedValueType>;
        recompute(): void;
        reset(): this;
        patch(): this;
        persist(key?: string): this;
    }
    export default Computed;
}

declare module 'pulse-framework/collection/collection' {
    import { Pulse, State, Group, PrimaryKey, GroupName, GroupAddOptions, Selector, Data } from 'pulse-framework/internal';
    type Expandable = {
            [key: string]: any;
    };
    interface RemoveOptions {
            fromGroups: (groups: string | number | Array<string>) => any;
            everywhere: () => any;
    }
    export interface DefaultDataItem extends Expandable {
    }
    export type GroupObj = {
            [key: string]: Group<any>;
    };
    export type SelectorObj = {
            [key: string]: Selector<any>;
    };
    export interface CollectionConfig<G, S> {
            groups?: G;
            selectors?: S;
            name?: string;
            primaryKey?: string | number;
            defaultGroup?: boolean;
    }
    export type Config<DataType = DefaultDataItem, G = GroupObj, S = SelectorObj> = CollectionConfig<G, S> | ((collection: Collection<DataType>) => CollectionConfig<G, S>);
    export class Collection<DataType = DefaultDataItem, G = GroupObj, S = SelectorObj> {
            instance: () => Pulse;
            config: Required<CollectionConfig<G, S>>;
            size: number;
            data: {
                    [key: string]: Data<DataType>;
            };
            groups: this['config']['groups'];
            selectors: this['config']['selectors'];
            computedFunc: (data: DataType) => DataType;
            constructor(instance: () => Pulse, config: Config<DataType, G, S>);
            /**
                * Create a group associated with this collection
                * @param initialIndex - An optional array of primary keys to initialize this groups with.
                */
            Group(initialIndex?: Array<PrimaryKey>): Group<DataType>;
            Selector(initialSelection?: string | number): Selector<DataType>;
            /**
                * Create a group associated with this collection
                * @param initialIndex - An optional array of primary keys to initialize this groups with.
                */
            createGroup(groupName: GroupName, initialIndex?: Array<PrimaryKey>): Group<DataType>;
            createSelector(selectorName: string | number, initialSelected?: PrimaryKey): Selector<DataType>;
            saveData(data: DataType, patch?: boolean): PrimaryKey | null;
            /**
                * Collect iterable data into this collection. Note:
                * - Data items must include a primary key (id)
                * @param {(Array<object>|object)} data - Array of data, or single data object
                * @param {(Array<string>|string)} groups - Array of group names or single group name
                */
            collect(items: DataType | Array<DataType>, groups?: GroupName | Array<GroupName>, config?: {
                    patch?: boolean;
                    method?: 'push' | 'unshift';
                    forEachItem?: (item: DataType, key: PrimaryKey, index: number) => void;
            }): void;
            /**
                * Return an item from this collection by primaryKey as Data instance (extends State)
                * @param {(number|string)} primaryKey - The primary key of the data
                */
            findById(id: PrimaryKey | State): Data<DataType>;
            getValueById(id: PrimaryKey | State): DataType;
            /**
                * Return an group from this collection as Group instance (extends State)
                * @param {(number|string)} groupName - The name of your group
                */
            getGroup(groupName: string | number): Group<DataType>;
            /**
                * Update data by id in a Pulse Collection
                * @param {(string|number|State)} updateKey - The primary key of the item to update
                * @param {Object} changes - This object will be deep merged with the original
                */
            update(updateKey: PrimaryKey | State, changes?: Expandable, config?: {
                    deep?: boolean;
            }): State;
            compute(func: (data: DataType) => DataType): void;
            put(primaryKeys: PrimaryKey | Array<PrimaryKey>, groupNames: GroupName | Array<GroupName>, options?: GroupAddOptions): void;
            /**
                * this is an alias function that returns other functions for removing data from a collection
                */
            remove(primaryKeys: PrimaryKey | Array<PrimaryKey>): RemoveOptions;
            removeFromGroups(primaryKeys: PrimaryKey | Array<PrimaryKey>, groups: GroupName | Array<GroupName>): boolean;
            deleteData(primaryKeys: PrimaryKey | Array<PrimaryKey>, groups: GroupName | Array<GroupName>): boolean;
            rebuildGroupsThatInclude(primaryKey: PrimaryKey): void;
            reset(): void;
    }
    export default Collection;
}

declare module 'pulse-framework/collection/group' {
    import { Pulse, State, Collection, DefaultDataItem } from 'pulse-framework/internal';
    export type PrimaryKey = string | number;
    export type GroupName = string | number;
    export type Index = Array<PrimaryKey>;
    export type InstanceContext = (() => Collection) | (() => Pulse);
    export class Group<DataType = DefaultDataItem> extends State<Array<PrimaryKey>> {
        _masterOutput: Array<DataType>;
        missingPrimaryKeys: Array<PrimaryKey>;
        computedFunc?: (data: DataType) => DataType;
        collection: () => Collection<DataType>;
        get index(): Array<PrimaryKey>;
        get output(): Array<DataType>;
        constructor(context: InstanceContext, initialIndex?: Array<PrimaryKey>, config?: {
            name?: string;
        });
        build(): any[];
        has(primaryKey: PrimaryKey): boolean;
        get size(): number;
        compute(func: (data: DataType) => DataType): void;
        add(primaryKey: PrimaryKey, options?: GroupAddOptions): this;
        remove(primaryKey: PrimaryKey): this;
    }
    export default Group;
    export interface GroupAddOptions {
        atIndex?: number;
        method?: 'unshift' | 'push';
        overwrite?: boolean;
    }
}

declare module 'pulse-framework/collection/selector' {
    import { Computed, Collection, DefaultDataItem, GroupObj, SelectorObj, PrimaryKey } from 'pulse-framework/internal';
    export class Selector<DataType = DefaultDataItem, G = GroupObj, S = SelectorObj> extends Computed<DataType> {
        set id(val: PrimaryKey);
        get id(): PrimaryKey;
        constructor(collection: () => Collection<DataType, G, S>, key: PrimaryKey);
        select(key: PrimaryKey): void;
        persist(key?: string): this;
        getPersistableValue(): string | number;
    }
    export default Selector;
}

declare module 'pulse-framework/collection/data' {
    import { State, Collection, DefaultDataItem } from 'pulse-framework/internal';
    export class Data<DataType = DefaultDataItem> extends State<DataType> {
        output: DataType | DefaultDataItem;
        constructor(collection: () => Collection, data: DataType);
    }
    export default Data;
}

declare module 'pulse-framework/controller' {
    import { Collection, State, Computed, Event } from 'pulse-framework/internal';
    export type StateObj = {
        [key: string]: State | Computed;
    };
    export type FuncObj = {
        [key: string]: (...args: any) => any;
    };
    export type EventObj = {
        [key: string]: Event;
    };
    export type AnyObj = {
        [key: string]: any;
    };
    export interface ControllerConfig {
        name?: string;
        root: {
            [key: string]: any;
        };
        state: StateObj;
        collection: Collection<any>;
        collections: {
            [key: string]: Collection<any>;
        };
        events: EventObj;
        actions: FuncObj;
        helpers: FuncObj;
        routes: FuncObj;
    }
    export class Controller<O extends Partial<ControllerConfig>> {
        name?: string;
        config: O;
        state: this['config']['state'];
        collection: this['config']['collection'];
        collections: this['config']['collections'];
        groups: this['config']['collection']['groups'];
        selectors: this['config']['collection']['selectors'];
        events: this['config']['events'];
        actions: this['config']['actions'];
        helpers: this['config']['helpers'];
        routes: this['config']['routes'];
        constructor(config: Partial<O>);
        root<R extends AnyObj = AnyObj>(bindObj: R): this & R;
    }
}

declare module 'pulse-framework/event' {
    import { Pulse } from 'pulse-framework/internal';
    export type EventPayload = {
        [key: string]: any;
    };
    export type EventCallbackFunc<P = EventPayload> = (payload: P) => void;
    export type CreateEventFunc = <P = EventPayload>(config?: EventConfig<P>) => Event<P>;
    export type EventsObjFunc = (createEventFunc: CreateEventFunc) => {
        [key: string]: Event;
    };
    export interface EventConfig<P = EventPayload> {
        name?: string;
        maxSubs?: number;
        enabled?: boolean;
        disableAfterUses?: number;
        throttle?: number;
        queue?: boolean;
    }
    export class Event<P = EventPayload> {
        instance: () => Pulse;
        config: EventConfig<P>;
        payload: P;
        constructor(instance: () => Pulse, config?: EventConfig<P>);
        on(callback: EventCallbackFunc<P>): () => void;
        emit(payload?: P): void;
        disable(): void;
    }
}

declare module 'pulse-framework/status' {
    import { Pulse, State } from 'pulse-framework/internal';
    interface StatusObjectData {
        message: string | null;
        status: 'invalid' | 'success' | 'error' | null;
    }
    export class StatusTracker {
        state: State<{
            [key: string]: StatusObjectData;
        }>;
        get all(): {
            [key: string]: StatusObjectData;
        };
        constructor(instance: () => Pulse);
        get(key: string): StatusObjectData;
        set(key: string): StatusObject;
        remove(key: string): void;
        clear(key?: string): void;
    }
    export class StatusObject {
        constructor(state: State<{
            [key: string]: StatusObjectData;
        }>, key: string);
        status(newStatus: 'invalid' | 'success' | 'error' | 'none'): StatusObject;
        message(messageText: string): StatusObject;
    }
    export default StatusTracker;
}

declare module 'pulse-framework/api/api' {
    export interface PulseResponse<DataType = any> {
        data: DataType;
        timedout?: boolean;
        status: number;
        raw?: Response;
        type?: string;
    }
    export interface APIConfig {
        options: RequestInit;
        baseURL?: string;
        path?: string;
        timeout?: number;
        requestIntercept?: Function;
        responseIntercept?: Function;
    }
    export class API {
        config: APIConfig;
        constructor(config?: APIConfig);
        /**
          * Override API config and request options. Returns a modified instance this API with overrides applied.
          * @param config - O
          */
        with(config: APIConfig): API;
        get(endpoint: string): Promise<PulseResponse<any>>;
        post(endpoint: string, payload?: any): Promise<PulseResponse<any>>;
        put(endpoint: string, payload?: any): Promise<PulseResponse<any>>;
        patch(endpoint: string, payload?: any): Promise<PulseResponse<any>>;
        delete(endpoint: string, payload?: any): Promise<PulseResponse<any>>;
    }
    export default API;
}

declare module 'pulse-framework/runtime' {
    import { Pulse, State, SubscriptionContainer } from 'pulse-framework/internal';
    export interface JobInterface {
            state: State;
            newStateValue?: any;
            background?: boolean;
    }
    export interface JobConfigInterface {
            perform?: boolean;
            background?: boolean;
    }
    export class Runtime {
            instance: () => Pulse;
            currentJob: JobInterface | null;
            trackState: boolean;
            foundState: Set<State>;
            constructor(pulseInstance: Pulse);
            /**
                * @internal
                * Creates a Job out of State and new Value and than add it to a job queue
                */
            ingest(state: State, newStateValue?: any, options?: JobConfigInterface): void;
            /**
                * @internal
                * Builds an object out of propKeysChanged in the SubscriptionContainer
                */
            formatChangedPropKeys(subscriptionContainer: SubscriptionContainer): {
                    [key: string]: any;
            };
            getFoundState(): Set<State<any>>;
            nextPulse(callback: () => any): void;
    }
    export default Runtime;
}

declare module 'pulse-framework/storage' {
    import { Pulse, State } from 'pulse-framework/internal';
    export interface StorageConfig {
        type?: 'custom' | 'localStorage';
        prefix?: string;
        async?: boolean;
        get?: any;
        set?: any;
        remove?: any;
    }
    export class Storage {
        config: StorageConfig;
        persistedState: Set<State>;
        constructor(instance: () => Pulse, config: StorageConfig);
        get(key: string): any;
        set(key: string, value: any): void;
        remove(key: string): void;
        handleStatePersist(state: State, key: string): void;
    }
    export default Storage;
    export function persist(items: Array<State>): void;
}

declare module 'pulse-framework/dep' {
    import { State, SubscriptionContainer } from 'pulse-framework/internal';
    export class Dep {
        deps: Set<any>;
        subs: Set<SubscriptionContainer>;
        constructor(initialDeps?: Array<Dep>);
        depend(instance: State): void;
    }
    export default Dep;
}

declare module 'pulse-framework/sub' {
    import { Pulse, State } from 'pulse-framework/internal';
    export type SubscriptionContainer = ComponentContainer | CallbackContainer;
    export class ComponentContainer {
            component: any;
            passProps: boolean;
            propStates?: {
                    [key: string]: State;
            };
            propKeysChanged: Array<string>;
            ready: boolean;
            subs: Set<State>;
            constructor(component: any, subs?: Set<State>);
    }
    export class CallbackContainer extends ComponentContainer {
            callback: Function;
            constructor(callback: Function, subs?: Set<State>);
    }
    export class SubController {
            pulseInstance: any;
            components: Set<ComponentContainer>;
            callbacks: Set<CallbackContainer>;
            constructor(pulseInstance: Pulse);
            /**
                * Subscribe to Pulse State with a returned object of props this props can than be returned by the component (See react-integration)
                */
            subscribeWithSubsObject(subscriptionInstance: any, subs?: {
                    [key: string]: State;
            }): {
                    subscriptionContainer: SubscriptionContainer;
                    props: {
                            [key: string]: State['value'];
                    };
            };
            /**
                * Subscribe to Pulse State
                */
            subscribeWithSubsArray(subscriptionInstance: any, subs?: Array<State>): SubscriptionContainer;
            /**
                * Registers the Component/Callback Subscription and returns a SubscriptionContainer
                */
            registerSubscription(integrationInstance: any, subs?: Array<State>): SubscriptionContainer;
            /**
                * This will mount the component (Mounts currently only useful in Component based Subscription)
                */
            mount(integrationInstance: any): void;
            /**
                * Unsubscribe a component or callback
                */
            unsubscribe(subscriptionInstance: any): void;
    }
    export default SubController;
}

declare module 'pulse-framework/integrations/use' {
    import { Pulse } from 'pulse-framework/internal';
    export interface Integration {
        ready?: boolean;
        frameworkConstructor?: any;
        name?: any;
        bind?: Function;
        updateMethod?: Function;
        wrapper?: Function;
        onReady?: Function;
    }
    export function use(plugin: any, pulseInstance: Pulse): void;
    export default use;
}

declare module 'pulse-framework/integrations/react.integration' {
    import { Pulse, State, Event, EventCallbackFunc } from 'pulse-framework/internal';
    export function PulseHOC(ReactComponent: any, deps?: Array<State> | {
        [key: string]: State;
    } | State, pulseInstance?: Pulse): any;
    type PulseHookArray<T> = {
        [K in keyof T]: T[K] extends State<infer U> ? U : never;
    };
    type PulseHookResult<T> = T extends State<infer U> ? U : never;
    export function usePulse<X extends State<any>[]>(deps: X | [], pulseInstance?: Pulse): PulseHookArray<X>;
    export function usePulse<X extends State<any>>(deps: X, pulseInstance?: Pulse): PulseHookResult<X>;
    export function useEvent<E extends Event>(event: E, callback: EventCallbackFunc<E['payload']>, pulseInstance?: Pulse): void;
    const _default: {
        name: string;
        bind(pulseInstance: Pulse): void;
        updateMethod(componentInstance: any, updatedData: Object): void;
        onReady(pulseInstance: any | Pulse): void;
    };
    export default _default;
}

declare module 'pulse-framework/utils' {
    import { Pulse, State, Collection } from 'pulse-framework/internal';
    export function cleanState<T>(state: State<T>): object;
    export function resetState(items: Iterable<State | Collection | any>): State<any>;
    export function getPulseInstance(state: State): Pulse;
    export function normalizeDeps(deps: Array<State> | State): State<any>[];
    export const copy: (val: any) => any;
    export function normalizeGroups(groupsAsArray?: any): object;
    export function shallowmerge(source: any, changes: any): any;
    export function defineConfig<C>(config: C, defaults: any): C;
    export function genId(): string;
    export function isFunction(func: () => any): boolean;
    export function isAsync(func: () => any): boolean;
    export function normalizeMap(map: any): {
        key: any;
        val: any;
    }[];
    export function cleanse(object: any): any;
    export function validateNumber(mutable: any, amount: any): boolean;
    export function normalizeArray(items: any | Array<any>): Array<any>;
}

declare module 'pulse-framework/helpers/extractAll' {
    /**
      * A helper function to extract all instances of a target instance from an object
      * If this function fails, it will do so silently, so it can be safely used without much knowledge of `inObj`.
      * @param findClass Class to extract instances of
      * @param inObj Object to find all instances of `findType` within
      */
    export function extractAll<I extends new (...args: any) => any, O>(findClass: I, inObj: O): Set<InstanceType<I>>;
}

declare module 'pulse-framework/helpers/isWatchableObj' {
    export function isWatchableObject(value: any): boolean;
}

